export default class SortableTable {


  constructor(header = [], {data} = {}) {

    this.header = header;
    this.data = data;

    //console.log(typeof data) -> {data} = {}
    // console.log('INCOMING HEADER')
    // console.log(this.header)

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

    for (let item of this.data) {
      sortedField.push(item[field]);
    }

    sortedField.sort(function (a, b) {

      a = a.toString();
      b = b.toString();

      if (direction === 'desc') {
        [a, b] = [b, a];
      }

      const icmp = a.localeCompare(b, undefined, { caseFirst: 'upper' });

      if (icmp !== 0) {
        // spotted a difference when considering the locale
        return icmp;
      }
    });

    // eslint-disable-next-line camelcase
    let resData = [];

    for (let item of sortedField) {
      //console.log(item)
      for (let dataItem of this.data) {

        if (dataItem[field] === item) {

          // console.warn(item);
          // console.info(dataItem[field]);

          resData.push(dataItem);
        }
      }
    }

    this.update(resData);

  }

  getHeaderFields() {

    const res = [];
    for (let columnHeader of this.header) {
      for (let [key, value] of Object.entries(columnHeader)) {
        // console.log(`TRTR`)
        // console.log(key, value)
        if (key === 'id') {
          res.push(value);
        }
      }

    }

    //console.log(res)

    return res;
  }

  getFieldsOfCell(item) {
    //console.log(item)
    // return item.map(field =>
    //   `<div class="sortable-table__cell">${field.value}</div>`
    //
    // ).join('');

    let res = '';
    //let res = this.getHeaderFields()

    const headerFields = this.getHeaderFields();
    console.log(`HEADERFIELSDS ${headerFields}`)

    for (let headerField of headerFields) {

      console.log(headerField);

      for (let [key, value] of Object.entries(item)) {

        console.log(`key ${key}`);

        if (key === headerField) {
          console.log('Bingo')
          res += `<div class="sortable-table__cell">${value}</div>`;
        }
      }
    }

    return res;
  }


  getCells(data) {
    return data.map(item =>
      `<a class="sortable-table__row">
        ${this.getFieldsOfCell(item)}
      </a>`
    ).join('');
  }


  get template() {
    return `
<!--      <div data-element="productsContainer" class="products-list__container">-->
        <div class="sortable-table">
          <div data-element="body" class="sortable-table__body">
           ${this.getCells(this.data)}
          </div>
        </div>
<!--      </div>-->
    `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      //console.log(accum)
      return accum;
    }, {});
  }


  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    //console.log(this.subElements.body.firstElementChild.children)

  }


  update(bodyData) {
    this.subElements.body.innerHTML = this.getCells(bodyData);
  }

  destroy() {
    this.element.remove();
  }
}

