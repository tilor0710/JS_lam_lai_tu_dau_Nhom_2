import { API_URL } from "../constants/baseURL.js";

export class BaseModel {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.baseURL = API_URL;
  }

  async #_request(url, options = {}) {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      const res = await fetch(url, { ...options, headers });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Lỗi HTTP: ${res.status}`);
      }

      if (res.status === 204) return null;

      return await res.json();
    } catch (error) {
      console.error(`[BaseModel Error - ${this.endpoint}]:`, error.message);
      throw error;
    }
  }

  async getAll(queryString = "") {
    const url = `${this.baseURL}/${this.endpoint}${queryString ? `?${queryString}` : ""}`;

    const res = await this.#_request(url, { method: "GET" });

    return res;
  }

  async getOne(id) {
    const url = `${this.baseURL}/${this.endpoint}/${id}`;

    const res = await this.#_request(url, { method: "GET" });

    return res;
  }

  async getBy(field, value) {
    const url = `${this.baseURL}/${this.endpoint}?${field}=${value}`;

    const res = await this.#_request(url, { method: "GET" });

    return res;
  }

  async post(data) {
    const url = `${this.baseURL}/${this.endpoint}`;

    const res = await this.#_request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  }

  async put(id, data) {
    const url = `${this.baseURL}/${this.endpoint}/${id}`;

    const res = await this.#_request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    return res;
  }

  async patch(id, data) {
    const url = `${this.baseURL}/${this.endpoint}/${id}`;

    const res = await this.#_request(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return res;
  }

  async deleteOne(id) {
    const url = `${this.baseURL}/${this.endpoint}/${id}`;

    const res = await this.#_request(url, {
      method: "DELETE",
    });

    return res;
  }
}
