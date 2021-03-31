class Tooltip {

  static linkToInstance;

  constructor() {


  }


  render() {

    if (Tooltip.linkToInstance !== undefined) {
      Tooltip.linkToInstance.remove();
    }

    const toolTipText = document.querySelector('[data-tooltip]').getAttribute('data-tooltip') //data-tooltip="bar-bar-bar"
    //console.log('toolTipText', toolTipText)
    //console.log('toolTipText', toolTipText.getAttribute('data-tooltip'))

    const element = document.createElement('div');
    //element.className = this.type;
    element.className = "tooltip";
    element.innerHTML = `
      <div>
        ${toolTipText}
      </div>
    `;
    this.element = element;

    const targetElement = document.querySelector('[data-tooltip]');
    console.log('targetElement', targetElement)
    console.log('targetElement.getBoundingClientRect()', targetElement.getBoundingClientRect())

    element.style.left = targetElement.getBoundingClientRect().left + 5 + 'px';
    element.style.top = targetElement.getBoundingClientRect().bottom + 5 + 'px';


    document.body.append(this.element);



    Tooltip.linkToInstance = this;


  }

  initialize() {

    //const toolTipText = document.querySelector('[data-tooltip]') //data-tooltip="bar-bar-bar"
    const targetElement = document.querySelector('[data-tooltip]');

    targetElement.addEventListener('pointerover', () => this.render());

    //document.addEventListener('pointerover', () => this.render());

  }

  remove() {
    this.element.remove();
  }


  destroy () {

    this.element.remove();
    Tooltip.linkToInstance.remove();
  }


}


const tooltip = new Tooltip();

export default tooltip;
