export default class SortableTable {


  constructor(header = [], {data} = {}) {

    this.header = header;
    this.data = data;

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

    console.log('sortedField', sortedField);

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


  getHeaderFields(item) {
    return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
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
  }

  destroy() {
    this.element.remove();
  }
}

