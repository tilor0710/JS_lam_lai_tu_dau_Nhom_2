import { API_URL } from "../constants/baseURL.js";

const SESSION_KEY = "quickship-session";

export class AuthService {
  getSession() {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
      const session = JSON.parse(stored);
      return session?.accessToken && session?.user ? session : null;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  isAuthenticated() {
    return Boolean(this.getSession());
  }

  async login(email, password) {
    return this.#authenticate("login", email, password);
  }

  async register(email, password) {
    return this.#authenticate("register", email, password);
  }

  async #authenticate(action, email, password) {
    const response = await fetch(`${API_URL}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        result.message || "Không thể xác thực tài khoản. Vui lòng thử lại.",
      );
    }
    if (!result.accessToken || !result.user) {
      throw new Error("Phản hồi xác thực không hợp lệ.");
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        accessToken: result.accessToken,
        user: result.user,
      }),
    );
    return result.user;
  }
}

export const authService = new AuthService();
