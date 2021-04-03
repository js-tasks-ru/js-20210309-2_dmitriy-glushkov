import fetchJson from './utils/fetch-json.js';
const BACKEND_URL = 'https://course-js.javascript.ru';


export default class ColumnChart {

  constructor(inputObj = {}) {

    this.chartHeight = 50;

    this.path = inputObj.url;
    this.range = inputObj.range;
    this.label = inputObj.label;

    this.link = inputObj.link;

    this.render();

    if (this.path && this.range.from && this.range.to) {
      const url = this.constructURL(this.path, this.range.from.toISOString(), this.range.to.toISOString());
      this.retrieveData(url);
    }
  }


  constructURL(path, fromDate, toDate){
    let url = new URL(path, BACKEND_URL);

    url.searchParams.set('from', fromDate );
    url.searchParams.set('to', toDate);
    return url;
  }


  async retrieveData(url) {

    const json = await fetchJson(url.toString());

    const retrievedDataArr = [];
    for (let val in json) {
      retrievedDataArr.push(json[val])
    }
    this.drawColumns(retrievedDataArr);
  }


  drawColumns(newData) {
    this.subElements.body.innerHTML = this.pasteColumns(newData);
  }


  update(fromDate, toDate) {
    const newUrl = this.constructURL(this.path, fromDate, toDate)
    this.retrieveData(newUrl)
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  pasteColumns(columnsData) {

    let res = "";

    if (!columnsData || columnsData === 0) {
      res = `<div ><img src="charts-skeleton.svg" alt="zaglushka"></div>`;
    }
    else {
      const maxValue = Math.max(...columnsData);
      [...columnsData].map(value => {
        let columnHeight = Math.floor(value * this.chartHeight / maxValue);
        let tooltipValue = Math.round(value / maxValue * 100);
        res += `<div style="--value: ${columnHeight}" data-tooltip="${tooltipValue}%"></div>`;
      });
    }
    return res;
  }


  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
             ${this.value}
           </div>

          <div data-element="body" class="column-chart__chart">
            ${this.pasteColumns()}
          </div>
        </div>
      </div>
    `;
  }


  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }


  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    if (this.range) {
      this.element.classList.remove('column-chart_loading');
    }
    this.subElements = this.getSubElements(this.element);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}



