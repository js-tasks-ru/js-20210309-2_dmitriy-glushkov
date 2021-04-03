class Tooltip {

  static linkToInstance;
  static offset = 7;

  constructor() {
    if (Tooltip.linkToInstance) {
      return Tooltip.linkToInstance;
    }
    Tooltip.linkToInstance = this;
  }

  render(event) {

    const element = document.createElement('div');
    element.className = "tooltip";
    element.innerHTML = `
      <div>
        ${event ? event['target'].getAttribute('data-tooltip') : ''}
      </div>
    `;
    this.element = element;

    element.style.left = event.clientX + Tooltip.offset + 'px';
    element.style.top = event.clientY + Tooltip.offset + 'px';

    document.body.append(this.element);
  }
  
  findAndShowTooltip(event) {
    if (event['target'].getAttribute('data-tooltip')) { this.render(event);}
  }

  findAndRemoveTooltip(event) {
    if (event['target'].getAttribute('data-tooltip')) { this.destroy();}
  }

  initialize() {
    document.addEventListener('pointerover', (event) => this.findAndShowTooltip(event));
    document.addEventListener('pointerout', (event) => this.findAndRemoveTooltip(event));
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
