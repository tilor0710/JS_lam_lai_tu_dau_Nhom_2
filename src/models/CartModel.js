import { BaseModel } from "../base/baseModel.js";

export class CartModel extends BaseModel {
  constructor() {
    super("carts");
  }

  async getDefaultCart() {
    return this.getOne(1);
  }

  async updateItems(items) {
    return this.patch(1, { items });
  }
}
