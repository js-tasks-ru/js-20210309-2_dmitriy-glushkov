import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {

  itemsAddToInfiniteScrollPage = 5

  constructor(headersConfig = [], data = {}) {

    this.header = headersConfig;
    this.pathname = data.url;
    const startSort = { field: headersConfig.find(item => item.sortable).id, order: 'asc'};

    this.defaultSortField = startSort.field;

    this.render();

    this.sortField = startSort.field;
    this.sortOrder = startSort.order;
    this.currItemOnPage = 0;

    this.retrieveDataFromServer(this.sortField, this.sortOrder, this.currItemOnPage).then(
      data => (this.subElements.body.innerHTML = this.getCells(data)));

    window.addEventListener('scroll', event => this.populate(event));
  }


  clickToSort(event) {
    let sortDirection = 'asc';
    const field = event.target.closest('[data-sortable="true"]');
    //console.log('field', field)

    if (field) {
      //console.log("in field")
      if (field.dataset.order === 'asc') {
        sortDirection = 'desc';
      }
      const fieldId = field.dataset.id;
      //console.log('fieldId', fieldId)
      field.append(this.subElements.arrow);
      field.dataset.order = sortDirection;

      this.sortField = fieldId;
      this.sortOrder = field.dataset.order;
      this.currItemOnPage = 0;

      this.retrieveDataFromServer(fieldId, field.dataset.order, 0).then(
        data => (this.subElements.body.innerHTML = this.getCells(data)));

      //this.sort(fieldId, sortDirection);
    }
  }


  // sort(field, direction) {
  //   const sortedField = [];
  //   this.data.map(dataItem => sortedField.push(dataItem[field]));
  //   sortedField.sort(function (a, b) {
  //     a = a.toString();
  //     b = b.toString();
  //     if (direction === 'desc') {
  //       [a, b] = [b, a];
  //     }
  //     const icmp = a.localeCompare(b, undefined, { caseFirst: 'upper', numeric: true });
  //     if (icmp !== 0) {
  //       // spotted a difference when considering the locale
  //       return icmp;
  //     }
  //   });
  //   const resData = [];
  //   sortedField.map(fieldItem => {
  //     for (let dataItem of this.data) {
  //       if (dataItem[field] === fieldItem) {
  //         resData.push(dataItem);
  //       }
  //     }
  //   });
  //   this.subElements.body.innerHTML = this.getCells(resData);
  // }


  constructURL(sortField, sortOrder, startItemOnPage) {
    const url = new URL(this.pathname, BACKEND_URL);
    url.searchParams.set('_sort', sortField);
    url.searchParams.set('_order', sortOrder);
    url.searchParams.set('_start', startItemOnPage);
    url.searchParams.set('_end', startItemOnPage + this.itemsAddToInfiniteScrollPage);
    return url;
  }


  populate() {
    // нижняя граница документа
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom < document.documentElement.clientHeight + 111) { // browser window + threshold
      console.log("Margin hit");
      this.currItemOnPage += this.itemsAddToInfiniteScrollPage;
      this.retrieveDataFromServer(this.sortField, this.sortOrder, this.currItemOnPage)
        .then(data => (this.subElements.body.innerHTML += this.getCells(data)));
    }
  }


  async retrieveDataFromServer(sortField, sortOrder, currPage) {
    const fullUrl = this.constructURL(sortField, sortOrder, currPage);
    const json = await fetchJson(fullUrl.toString());
    const retrievedDataArr = [];
    for (let val of json) {
      retrievedDataArr.push(val);
    }
    return retrievedDataArr;
  }


  render(resvData) {
    this.data = resvData;
    const tempElem = document.createElement('div');
    tempElem.innerHTML = this.template;
    const elem = tempElem.firstElementChild;
    this.element = elem;
    this.subElements = this.getSubElements(elem);
    this.subElements.header.addEventListener('pointerdown', (event) => this.clickToSort(event));
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
      //console.log('in set arrow field', field)
      return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
        </span>
      `;} else {return ``;}
  }
  getCells(data) {
    if (data === undefined) {
      return `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>`;
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
  destroy() {
    this.element.remove();
  }
}
