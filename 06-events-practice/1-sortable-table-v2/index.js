export default class SortableTable {


  constructor(header = [], {data} = {}) {

    this.header = header;
    this.data = data;

    const sortableFields = this.header.filter(item => item.sortable === true).map(item => item.id);

    this.defaultSortField = sortableFields[0];

    this.render();
  }


  getLinkToImg(item) {
    if (item['images'] !== undefined && item['images'][0]['url'] !== undefined) {
      return item['images'][0]['url'];
    }
    else {
      return "";
    }
  }


  sort(field, direction) {

    const sortedField = [];
    this.data.map(dataItem => sortedField.push(dataItem[field]));

    sortedField.sort(function (a, b) {

      a = a.toString();
      b = b.toString();

      if (direction === 'desc') {
        [a, b] = [b, a];
      }

      const icmp = a.localeCompare(b, undefined, { caseFirst: 'upper', numeric: true });

      if (icmp !== 0) {
        // spotted a difference when considering the locale
        return icmp;
      }
    });

    const resData = [];

    sortedField.map(fieldItem => {
      for (let dataItem of this.data) {
        if (dataItem[field] === fieldItem) {
          resData.push(dataItem);
        }
      }
    });

    this.subElements.body.innerHTML = this.getCells(resData);
  }

  setArrow(field) {
    if (field === this.defaultSortField) {
      return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
        </span>
      `;} else {
      return ``;
    }
  }


  getHeaderFields(item) {
    if (this.order === undefined) {this.order = 'asc';}
    return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${this.order}"">
        <span>${item.title}</span>
        ${this.setArrow(item.id)}
      </div>`;
  }


  getHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header.map(item => this.getHeaderFields(item)).join('')}
      </div>`;
  }


  getFieldsOfCell(item) {
    const fieldNames = [];
    this.header.map(headerItem => fieldNames.push(headerItem.id));

    return fieldNames.map(fieldName =>
      `
        <div class="sortable-table__cell">${item[fieldName]}</div>
       `).join('');
  }


  getCells(data) {
    return data.map(item =>
      `<a href="/products/${item.id}" class="sortable-table__row">
        ${this.getFieldsOfCell(item)}
      </a>`
    ).join('');
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


  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }


  render() {
    const tempElem = document.createElement('div');
    tempElem.innerHTML = this.template;
    const elem = tempElem.firstElementChild;
    this.element = elem;
    this.subElements = this.getSubElements(elem);

    this.subElements.header.addEventListener('pointerdown', (event) => this.clickToSort(event));
  }

  clickToSort(event) {

    let sortDirection = 'asc';
    const field = event.target.closest('[data-sortable="true"]');

    if (field) {
      if (field.dataset.order === 'asc') {
        sortDirection = 'desc';
      }

      const fieldId = field.dataset.id;

      field.append(this.subElements.arrow);

      field.dataset.order = sortDirection;

      this.sort(fieldId, sortDirection);
    }
  }

  destroy() {
    this.element.remove();
  }
}
