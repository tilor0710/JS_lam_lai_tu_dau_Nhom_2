export class BaseController {
  constructor(service, view) {
    this.service = service;
    this.view = view;
  }

  async init() {
    throw new Error(
      `[BaseController Error]: Bạn chưa định nghĩa hàm init() cho Controller này!`,
    );
  }
}
