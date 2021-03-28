export default class NotificationMessage {

  static linkToInstance;

  constructor(message = '', {duration = 0, type = 'success'} = {}) {

    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }


  render () {
    const element = document.createElement('div');
    element.className = this.type;
    element.innerHTML = `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">${this.message}</div>
        </div>
      </div>
    `;
    this.element = element;
  }


  show (targetElement) {

    if (NotificationMessage.linkToInstance !== undefined) {
      NotificationMessage.linkToInstance.remove();
    }

    if (targetElement) {
      targetElement.append(this.element);
    }
    else {
      document.body.append(this.element);
    }

    NotificationMessage.linkToInstance = this;

    setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
