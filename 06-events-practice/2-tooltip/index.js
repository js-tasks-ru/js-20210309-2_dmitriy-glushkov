class Tooltip {

  static linkToInstance;

  render(event) {

    if (Tooltip.linkToInstance !== undefined) {
      Tooltip.linkToInstance.remove();
    }

    const toolTipText = document.querySelector('[data-tooltip]').getAttribute('data-tooltip');

    const element = document.createElement('div');
    element.className = "tooltip";
    element.innerHTML = `
      <div>
        ${toolTipText}
      </div>
    `;
    this.element = element;

    const targetElement = document.querySelector('[data-tooltip]');
    element.style.left = event.clientX + 7 + 'px';
    element.style.top = event.clientY + 'px';

    document.body.append(this.element);

    Tooltip.linkToInstance = this;
  }

  changeTooltipText (event) {
    this.element.innerHTML = `
     <div>
        ${event['target'].getAttribute('data-tooltip')}
     </div>`;
  }

  initialize() {
    const targetElement = document.querySelector('[data-tooltip]');

    targetElement.addEventListener('pointerover', (event) => this.render(event));

    targetElement.addEventListener('mouseover', (event) => this.changeTooltipText(event));

    targetElement.addEventListener('pointerout', () => this.destroy());
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
