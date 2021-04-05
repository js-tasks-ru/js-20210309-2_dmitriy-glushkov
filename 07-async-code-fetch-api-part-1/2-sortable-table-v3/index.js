import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {

  itemsOnPage = 5

  //constructor(headersConfig = [], { data = [], sorted = { id: headersConfig.find(item => item.sortable).id, order: 'asc'}} = {}) {
  constructor(headersConfig = [], data = {}) {

    // console.log('headersConfig', headersConfig)
    // console.log('data', data)
    // console.log('data.url', data.url)
    this.header = headersConfig;
    this.pathname = data.url;
    const startSort = { field: headersConfig.find(item => item.sortable).id, order: 'asc'};
    //console.log('startSort', startSort)

    //this.data = []


    // console.log("this.data in const",this.data)
    // this.render([{"id": "101-planset-lenovo-tab-p10-tb-x705l-32-gb-3g-lte-belyj",
    //     "title": "10.1\" Планшет Lenovo TAB P10 TB-X705L 32 ГБ 3G, LTE белый",
    //     "price": 300,
    //     "rating": 5,
    //     "discount": 0
    // }]);
    this.render()

    this.sortField = startSort.field;
    this.sortOrder = startSort.order
    this.currPage = 0

    this.retrieveDataAndDrawTable(this.sortField, this.sortOrder, this.currPage).then(
      data => (this.subElements.body.innerHTML = this.getCells(data))    );

    window.addEventListener('scroll', event => this.populate(event));

    //this.retrieveDataAndDrawTable(startSort.field, startSort.order, 0).then(data => this.render(data));

    // this.subElements.body.innerHTML = this.getCells(resData);

    //this.subElements.body.innerHTML = this.getCells(resData);

    // console.log("in constructor", const retrievedDataArr = this.retrieveDataAndDrawTable(startSort.field, startSort.order, 0).
    //   then(this.data = retrievedDataArr));

    //return this.getHeader()
  }

  constructURL(sortField, sortOrder, startPageNumber) {

    // //https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30
    // //https://course-js.javascript.ru/api/rest/products?_sort=title&_order=desc&_start=0&_end=30

    const url = new URL(this.pathname, BACKEND_URL);
    url.searchParams.set('_sort', sortField);
    url.searchParams.set('_order', sortOrder);
    url.searchParams.set('_start', startPageNumber);
    url.searchParams.set('_end', startPageNumber + this.itemsOnPage);
    return url;
  }


  populate() {

    // нижняя граница документа
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      console.log("Margin hit");
      this.currPage += 1;
      this.retrieveDataAndDrawTable(this.sortField, this.sortOrder, this.currPage)
        .then(data => (this.subElements.body.append(this.getCells(data))));
    }
  }

  async retrieveDataAndDrawTable(sortField, sortOrder, currPage) {

    const fullUrl = this.constructURL(sortField, sortOrder, currPage);

    const json = await fetchJson(fullUrl.toString());
    //console.log('json', json)


    //const retrievedDataArr = await json.map(item => retrievedDataArr[item]);
    const retrievedDataArr = [];

    //await console.log('retrievedDataArr', retrievedDataArr)
    //this.data = retrievedDataArr

    for (let val of json) {
      retrievedDataArr.push(val);
    }
    //console.log('retrievedDataArr', retrievedDataArr)
    //this.drawColumns(retrievedDataArr);
    //this.data = retrievedDataArr
    //await this.render()
    //console.log("gotovo")

    //this.data = retrievedDataArr

    return retrievedDataArr
  }


  render(resvData) {


    this.data = resvData;

    const tempElem = document.createElement('div');
    tempElem.innerHTML = this.template;
    const elem = tempElem.firstElementChild;
    this.element = elem;
    this.subElements = this.getSubElements(elem);

    //console.log("gotovo in render")
    //this.subElements.header.addEventListener('pointerdown', (event) => this.clickToSort(event));
  }
  get template() {
    return `
      <div class="sortable-table">
            ${this.getHeader()}
        <div data-element="body" class="sortable-table__body">
            ${this.getCells(this.data)}
        </div>
      </div>
    `;
  }
  getHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header.map(item => this.getHeaderFields(item)).join('')}
      </div>`;
  }
  getHeaderFields(item) {
    if (this.order === undefined) {this.order = 'asc';}
    return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${this.order}"">
        <span>${item.title}</span>
        ${this.setArrow(item.id)}
      </div>`;
  }
  setArrow(field) {
    if (field === this.defaultSortField) {
      return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
        </span>
      `;} else {return ``;}
  }
  getCells(data) {
    console.log('in getCells', data)
    if (data === undefined) {
      return `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>`
    } else {
      return data.map(item =>
        `<a href="/products/${item.id}" class="sortable-table__row">
        ${this.getFieldsOfCell(item)}
      </a>`
      ).join('');
    }

  }
  getFieldsOfCell(item) {
    const fieldNames = [];
    this.header.map(headerItem => fieldNames.push(headerItem.id));
    return fieldNames.map(fieldName =>
      `<div class="sortable-table__cell">${item[fieldName]}</div>`).join('');
  }
  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }





    //
    // function populate() {
    //   while (true) {
    //     // высота окна в браузере
    //     console.log('clientHeight', document.documentElement.clientHeight);
    //
    //     // нижняя граница документа
    //     let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    //     console.log('bottom', document.documentElement.getBoundingClientRect().bottom);
    //
    //     if (windowRelativeBottom > document.documentElement.clientHeight + 100) {break;}
    //     document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    //   }
    // }
    //
    //
    // window.addEventListener('scroll', populate);
    //
    // populate(); // инициализация документа
    //

    //
    //
}
