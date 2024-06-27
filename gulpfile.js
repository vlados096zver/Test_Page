const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');

// Compile SCSS into CSS and minify CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css')) // Combine all SCSS files into one CSS file
        .pipe(cssnano()) // Minify and optimize CSS, removing duplicates
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Paths to source files and destination folders
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/',
        main: 'src/js/main.js'
    }
};

// Minify only main.js
function scripts() {
    return gulp.src(paths.scripts.main, { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// Start a local server and watch for file changes
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

// Default task
const build = gulp.series(gulp.parallel(styles, scripts), watch);
gulp.task('default', build);

