export class BaseView {
  constructor(containerSelector = "#app-content") {
    this.containerSelector = containerSelector;
    this.container = document.querySelector(this.containerSelector);
  }

  getTemplate(data) {
    return ``;
  }

  render(data = {}) {
    if (!this.container) {
      this.container = document.querySelector(this.containerSelector);
    }

    if (this.container) {
      this.container.innerHTML = this.getTemplate(data);

      this.run();
    } else {
      console.error(
        `[BaseView Error]: Không tìm thấy thẻ chứa ${this.containerSelector}`,
      );
    }
  }

  run() {}
}
