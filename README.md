
# Gulp Project

This project uses Gulp to automate the tasks of compiling SCSS to CSS, minifying CSS and JavaScript files, and running a local development server with live reloading.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   Navigate to the project directory and run:
   ```sh
   npm install
   ```

3. **Run the development server:**
   To start the development server and watch for changes, run:
   ```sh
   gulp
   ```

- **src/**: Source files for your project.
  - **js/**: JavaScript source files.
  - **scss/**: SCSS source files.
- **dist/**: Compiled and minified files will be generated here.
  - **css/**: Compiled CSS files.
  - **js/**: Compiled JavaScript files.
- **gulpfile.js**: Configuration file for Gulp tasks.
- **package.json**: Lists project dependencies and scripts.
- **index.html**: Main HTML file.

## Gulp Tasks

The following Gulp tasks are defined:

- **`gulp styles`**: Compiles SCSS to CSS, concatenates, minifies, and writes source maps.
- **`gulp scripts`**: Minifies the `main.js` file and writes source maps.
- **`gulp watch`**: Starts a local server and watches for changes in files, reloading the browser as necessary.
- **`gulp`**: The default task that runs `styles`, `scripts`, and `watch` tasks in series.

## Usage

- **Development**: Run `gulp` to start the local server with live reloading and watch for changes in SCSS and JS files.
- **Production**: The compiled and minified files can be found in the `dist` directory.

