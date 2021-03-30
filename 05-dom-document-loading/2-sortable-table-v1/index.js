export default class SortableTable {


  constructor(header = [], {data} = {}) {

    this.header = header;
    this.data = data;

    //console.log(typeof data) -> {data} = {}

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

    for (let item of sortedField){
      console.log(item)
      for (let dataItem of this.data){
        console.log(dataItem[field])
        if (dataItem[field] === item){
          resData.push(dataItem)
        }
      }
    }

    this.update(resData)

  }


  getCells(data) {
    return data.map(item =>
      `
     <a href="/products/dvd/blu-ray-pleer-yamaha-bd-s477" class="sortable-table__row">
         <!--<div class="sortable-table__cell">
        <img class="sortable-table-image" alt="Image" src=${this.getLinkToImg(item)}></div>-->
        <div class="sortable-table__cell">${item.title}</div>
        <div class="sortable-table__cell">${item.quantity}</div>
        <div class="sortable-table__cell">${item.price}</div>
        <div class="sortable-table__cell">${item.sales}</div>
      </a>
`
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

