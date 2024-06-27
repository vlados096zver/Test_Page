function initializeBlurHandlers() {
  const usdInput = document.querySelector('.usdInput');
  const btcInput = document.querySelector('.btcInput');
  const curseChange = 0.0000149;

  function convertCurrency(inputValue, convertTo) {
    const value = parseFloat(inputValue.replace(',', '.'));
    if (!isNaN(value)) {
      if (convertTo === 'usd') {
        return (value / curseChange);
      } else if (convertTo === 'btc') {
        return (value * curseChange);
      }
    }
    return '';
  }

  usdInput.addEventListener('blur', function() {
    btcInput.value = convertCurrency(usdInput.value, 'btc');
  });

  btcInput.addEventListener('blur', function() {
    usdInput.value = convertCurrency(btcInput.value, 'usd');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initializeBlurHandlers();
});

document.querySelector('.converter__btn').addEventListener('click', function() {
  const row = document.querySelector('.converter__row');
  const cols = row.querySelectorAll('.converter__col');

  if (cols.length === 2) {
    const tempHTML = cols[0].innerHTML;
    cols[0].innerHTML = cols[1].innerHTML;
    cols[1].innerHTML = tempHTML;

    initializeBlurHandlers();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  let searchPoint = document.querySelector('.header__point--search');
  let headerRow = document.querySelector('.header__row');
  let headerSearch = document.querySelector('.header__search');
  searchPoint.addEventListener('click', function() {
    headerRow.classList.add('active');
    headerSearch.focus();
  });
});

let lineBurger = document.querySelector('.line-burger');
let mainHeaderList = document.querySelector('.header__list');
document.addEventListener('DOMContentLoaded', function() {
  var headerPointSearch = document.querySelector('.header__point--search');
  var headerRow = document.querySelector('.header__row');

  headerPointSearch.addEventListener('click', function(event) {
    event.stopPropagation();
    headerRow.classList.add('active');
    var lineBurger = document.querySelector('.line-burger');

    if (lineBurger.classList.contains('line-active') && window.innerWidth <= 840) {
      lineBurger.classList.toggle('line-active');
      slideUp(mainHeaderList, 200);
    }
  });

  document.addEventListener('click', function(event) {
    if (!headerRow.contains(event.target)) {
      headerRow.classList.remove('active');
    }
  });
});

document.addEventListener('click', function(event) {
  const header = document.querySelector('.header');
  if (!header.contains(event.target) && window.innerWidth <= 840) {
    if (lineBurger.classList.contains('line-active') && window.innerWidth <= 840) {
      lineBurger.classList.toggle('line-active');
      slideUp(mainHeaderList, 200);
    }
  }
});


document.querySelector('.mobile-wrap').addEventListener('click', function() {
  lineBurger.classList.toggle('line-active');
  if (mainHeaderList.style.display === 'block') {
    slideUp(mainHeaderList, 200);
  } else {
    slideDown(mainHeaderList, 200);
  }
});

function clickBurger() {
  lineBurger.classList.toggle('line-active');
  if (mainHeaderList.style.display === 'block') {
    slideUp(mainHeaderList, 200);
  } else {
    slideDown(mainHeaderList, 200);
  }
}

window.addEventListener('resize', function() {
  let mainHeaderList = document.querySelector('.header__list');
  let lineBurger = document.querySelector('.line-burger');

  if (window.innerWidth > 840) {
    mainHeaderList.removeAttribute('style');
    lineBurger.classList.remove('line-active');
  }
});

function slideDown(element, duration) {
  element.style.display = 'block';
  let height = element.clientHeight;
  element.style.height = '0';
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    let elapsedTime = currentTime - startTime;
    let progress = elapsedTime / duration;

    element.style.height = progress * height + 'px';

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.height = null;
    }
  }

  requestAnimationFrame(animate);
}

function slideUp(element, duration) {
  let height = element.clientHeight;
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    let elapsedTime = currentTime - startTime;
    let progress = elapsedTime / duration;

    element.style.height = (1 - progress) * height + 'px';

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
      element.style.height = null;
    }
  }

  requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', function() {

  const contentList = document.querySelector('.content__list');

  contentList.scrollLeft = contentList.scrollWidth - contentList.clientWidth;
  const chartCanvas = document.getElementById('myChart');
  const ctx = chartCanvas.getContext('2d');

  // Define colors
  const historicalColor = '#1873e6';
  const forecastedColor = '#9C4FFF';

  const historicalData = [20000, 24000, 30000, 34000, 42000, 50000, 56000];
  const forecastedData = [null, null, null, null, null, null, 56000, 68000, 74000, 78000, 78000, 80000];

  const labels = ['12/23', '01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24',
    '10/24', '11/24', '12/24'
  ];

  let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, 'rgba(24, 115, 235, 0.35)');
  gradientStroke.addColorStop(1, 'rgba(24, 115, 235, 0)');

  let gradientFill = ctx.createLinearGradient(chartCanvas.width / 2, 0, chartCanvas.width / 2, chartCanvas.height);
  gradientFill.addColorStop(0, 'rgba(24, 115, 235, 0.35)');
  gradientFill.addColorStop(1, 'rgba(24, 115, 235, 0)');

  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;
      const index = labels.indexOf('06/24');

      if (index !== -1) {
        const x = xAxis.getPixelForValue(labels[index]);

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#4D4D4D';
        ctx.stroke();
        ctx.restore();
      }

      labels.forEach((label, index) => {
        const x = xAxis.getPixelForValue(label);
        const y = yAxis.bottom + 6;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 6);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#D3D3D4';
        ctx.stroke();
        ctx.restore();
      });
    }
  };

  const chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Historical',
        data: historicalData,
        backgroundColor(context) {
          const chartArea = context.chart.chartArea;

          if (!chartArea) return;

          const yAxis = context.chart.scales.y;
          const y = yAxis.getPixelForValue(Math.max(...historicalData));

          var gradient = ctx.createLinearGradient(0, y, 1, chartArea.bottom);

          gradient.addColorStop(0, 'rgba(24, 115, 235, 0.35)');
          gradient.addColorStop(1, 'rgba(24, 115, 235, 0)');

          return gradient;

        },
        borderColor: historicalColor,
        borderWidth: 4,
        pointRadius: 3,
        pointBorderWidth: 0,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 1,
        fill: true
      }, {
        label: "Forecasted",
        type: "line",
        borderColor: forecastedColor,
        data: forecastedData,
        fill: false,
        backgroundColor: forecastedColor,
        borderWidth: 4,
        pointRadius: 3,
        pointBorderWidth: 0,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 1,
        borderDash: [5, 5],
        borderDashOffset: 0,
        pointStyle: false
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: labels,
          grid: {
            display: false
          },
          ticks: {
            padding: 8,
            font: {
              family: 'OpenSans',
              size: 12,
              weight: '400',
            },
          },
        },
        y: {
          beginAtZero: false,
          border: {
            display: false // Hide Y-axis border
          },
          ticks: {
            padding: 20,

            font: {
              family: 'OpenSans',
              size: 12,
              weight: '400',
            },
          },
        }
      },
      plugins: {
        legend: {
          display: true,
          align: 'end',
          labels: {
            useBorderRadius: true,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            borderRadius: 3,
            generateLabels: function(chart) {
              const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
              labels.forEach(label => {
                if (label.text === 'HISTORICAL') {
                  label.fillStyle = historicalColor;
                } else {
                  label.fillStyle = forecastedColor;
                }
              });
              return labels;
            },
            font: {
              family: 'OpenSans',
              size: 14,
              weight: '600',
            },
          },
          padding: {
            bottom: 16
          }
        },
        verticalLine: verticalLinePlugin
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          borderWidth: 0,
          backgroundColor: 'red'
        }
      }
    },
    plugins: [verticalLinePlugin, {
      afterInit(chart) {
        chart.legend._update = chart.legend.update;
        chart.legend.update = function(...args) {
          this._update(...args);
          const padding = {
            ...(this.options.padding || {})
          };
          this.height += Math.max(0, ~~padding.bottom);
          this.width += Math.max(0, ~~padding.right);
        };
      },
    }]
  };

  chartConfig.data.datasets = chartConfig.data.datasets.map(dataset => ({
    ...dataset,
    label: dataset.label.toUpperCase()
  }));

  const chart = new Chart(ctx, chartConfig);

  function updateLegendAlignment() {
    if (window.innerWidth < 768) {
      chart.options.plugins.legend.align = 'center';
    } else {
      chart.options.plugins.legend.align = 'end';
      chart.options.plugins.legend.labels.padding = 20;
    }
    chart.update();
  }

  updateLegendAlignment();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateLegendAlignment();
      chart.resize();
    }, 100);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const advCols = document.querySelectorAll('.adv__col:not(.adv__col--bonus)');
  advCols.forEach((advCol) => {
    const tabs = advCol.querySelectorAll('.tabs__box');
    const tabContents = advCol.querySelectorAll('.tabs__item');

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        tabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(content => content.style.display = 'none');
        tabContents[index].style.display = 'block';
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const selectElements = document.querySelectorAll('.custom-select__inner');

  selectElements.forEach(selectElement => {
    const customSelect = selectElement.closest('.custom-select__block');
    const customOptions = document.createElement('div');
    customOptions.classList.add('custom-select__options');

    Array.from(selectElement.options).forEach(option => {
      const customOption = document.createElement('div');
      customOption.classList.add('custom-select__item');
      customOption.textContent = option.textContent;
      customOption.dataset.value = option.value;

      customOption.addEventListener('click', (event) => {
        customOptions.querySelectorAll('.custom-select__item').forEach(item => {
          item.classList.remove('active');
        });
        customOption.classList.add('active');

        selectElement.value = option.value;
        customSelect.dataset.content = option.textContent;
        customOptions.classList.remove('visible');
        customOptions.remove();
        if (selectElement.classList.contains('price-select')) {
          changeValueInMonth(option);
        }
        if (selectElement.classList.contains('filter-select')) {
          applyFilter(option.value);
        }
        event.stopPropagation();
      });

      customOptions.appendChild(customOption);
    });

    const initialSelectedOption = selectElement.options[selectElement.selectedIndex];
    const initialCustomOption = customOptions.querySelector(`[data-value="${initialSelectedOption.value}"]`);
    if (initialCustomOption) {
      initialCustomOption.classList.add('active');
    }

    customSelect.dataset.content = initialSelectedOption.textContent;

    customSelect.addEventListener('click', (event) => {
      event.stopPropagation();
      document.querySelectorAll('.custom-select__options.visible').forEach(visibleOptions => {
        visibleOptions.classList.remove('visible');
        visibleOptions.remove();
      });
      customSelect.appendChild(customOptions);
      customOptions.classList.toggle('visible');
    });

    document.addEventListener('click', () => {
      customOptions.classList.remove('visible');
      customOptions.remove();
    });
  });

  function changeValueInMonth(option) {
    const priceItems = document.querySelectorAll('.price__item');
    priceItems.forEach(item => {
      item.style.display = 'none';
    });
    const selectedPriceItem = document.querySelector(`.price__item[data-price="${option.value}"]`);
    if (selectedPriceItem) {
      selectedPriceItem.style.display = 'block';
    }
  }
});
const links = document.querySelectorAll('.info__link');
const items = document.querySelectorAll('.info__item');

function applyFilter(filterValue) {
  items.forEach(item => {
    if (item.getAttribute('data-category') === filterValue || filterValue === 'All') {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

links.forEach(link => {
  link.addEventListener('click', function() {
    links.forEach(link => link.classList.remove('active'));

    this.classList.add('active');

    const filterValue = this.getAttribute('data-filter');

    applyFilter(filterValue);
  });
});

const activeLink = document.querySelector('.info__link.active');
if (activeLink) {
  const filterValue = activeLink.getAttribute('data-filter');
  applyFilter(filterValue);
}

let previousValue = null;

function checkWindowSize() {
  let elem, value;

  if (window.innerWidth > 767) {
    elem = document.querySelector('.info__link.active');
    value = elem.getAttribute('data-filter');
  } else {
    elem = document.querySelector('.custom-select__wrapper--info .custom-select__block');
    value = elem.getAttribute('data-content');
  }

  if (value !== previousValue) {
    applyFilter(value);
    previousValue = value;
  }
}

window.addEventListener('resize', checkWindowSize);
