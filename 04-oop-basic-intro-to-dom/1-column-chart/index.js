export default class ColumnChart {


  constructor(inputObj = {}) {

    this.chartHeight = 50;

    this.data = inputObj.data;
    this.label = inputObj.label;
    this.value = inputObj.value;
    this.link = inputObj.link;

    this.render();
  }


  setColumnChartType () {
    return (!this.data || this.data.length === 0) ?
      `<div class="column-chart column-chart_loading" style="--chart-height: 50">` :
      `<div class="column-chart" style="--chart-height: 50">`;
  }


  pasteColumns() {
    let res = "";
    if (!this.data || this.data.length === 0) {
      res = `<div ><img src="charts-skeleton.svg" alt="zaglushka"></div>`;
    }
    else {
      res += `<div data-element="body" class="column-chart__chart">`;

      const maxValue = Math.max(...this.data);

      [...this.data].map(value => {

        let columnHeight = Math.floor(value * this.chartHeight / maxValue);
        let tooltipValue = Math.round(value / maxValue * 100);

        res += `<div style="--value: ${columnHeight}" data-tooltip="${tooltipValue}%"></div>`;
      });
    }
    return res;
  }


  render() {
    const element = document.createElement('div'); // (*)
    element.innerHTML = `
      ${this.setColumnChartType()}
      <div class="column-chart__title">
        Total ${this.label}
        <a class="column-chart__link" href="${this.link}">View all</a>
      </div>
      <div data-element="header" class="column-chart__header">${this.value}</div>
         ${this.pasteColumns()}
      </div>
    `;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;
  }


  update(newData) {

    const newDataElement = document.createElement('div');
    newDataElement.innerHTML = this.pasteColumns(newData);

    const chart = this.element.querySelector('.column-chart__chart');
    chart.append(newDataElement);
  }


  remove () {
    this.element.remove();
  }


  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}

