export default class NotificationMessage {

  static notificationInstances = []

  constructor(message = '', {duration = 0, type = 'success'} = {}) {

    this.message = message;
    this.duration = duration;
    this.type = type;

    this.show();

    NotificationMessage.notificationInstances = [];
    NotificationMessage.notificationInstances.push(this);

    setTimeout(() => this.destroy(), this.duration);
  }


  show (whatsTheHell) {

    if (NotificationMessage.notificationInstances.length !== 0) {
      for (let NI of NotificationMessage.notificationInstances) {
        NI.remove();
      }
    }

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

    document.body.append(this.element);

    if (whatsTheHell) {
      whatsTheHell.append(this.element);
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
