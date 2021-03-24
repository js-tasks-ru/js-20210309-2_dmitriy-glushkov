export default class ColumnChart {


  constructor(inputObj = {}) {

    this.chartHeight = 50;

    this.data = inputObj.data;
    this.label = inputObj.label;
    this.value = inputObj.value;
    this.link = inputObj.link;

    this.render();
  }


  pasteColumns() {
    let res = "";
    const maxValue = Math.max(...this.data);

    for (let value of this.data) {

      if (value === maxValue) {
        res = res + `<div style="--value: ${this.chartHeight}" data-tooltip="100%"></div>`;
      }
      else {

        let columnHeight = Math.floor(value * this.chartHeight / maxValue);
        let tooltipValue = Math.round(value / maxValue * 100);

        res = res + `<div style="--value: ${columnHeight}" data-tooltip="${tooltipValue}%"></div>`;
      }

    }
    return res;
  }


  render() {
    const element = document.createElement('div'); // (*)

    if (!this.data || this.data.length === 0) {
      element.innerHTML = `
        <div class="column-chart column-chart_loading" style="--chart-height: 50">
          <div class="column-chart__title">
            Total ${this.label}
            <a class="column-chart__link" href="${this.link}">View all</a>
          </div>
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div >
              <img src="charts-skeleton.svg" alt="zaglushka">
          </div>
        </div>
      `;
    }
    else {
      element.innerHTML = `
        <div class="column-chart" style="--chart-height: 50">
          <div class="column-chart__title">
            Total ${this.label}
            <a class="column-chart__link" href="${this.link}">View all</a>
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
               ${this.pasteColumns()}
            </div>
          </div>
        </div>
    `;}

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;
  }

  update() {

  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}

