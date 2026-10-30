const API_URL = "http://localhost:3000";
export const AUTH_STORAGE_KEY = "quickship_current_user";
export const TOKEN_STORAGE_KEY = "quickship_jwt_token";

export class AuthService {

  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          typeof data === "string"
            ? data
            : data.message || "Email hoặc mật khẩu không chính xác!";
        throw new Error(errorMsg);
      }
      localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      console.error("[AuthService Login Error]:", error.message);
      throw error;
    }
  }


  static async register({ email, password, name, phone }) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
          name: name.trim(),
          phone: phone.trim(),
          role: "USER",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          typeof data === "string"
            ? data
            : data.message || "Đăng ký không thành công!";
        throw new Error(errorMsg);
      }
      localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      console.error("[AuthService Register Error]:", error.message);
      throw error;
    }
  }


  static logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  static getCurrentUser() {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static isAuthenticated() {
    return (
      localStorage.getItem(TOKEN_STORAGE_KEY) !== null &&
      this.getCurrentUser() !== null
    );
  }

  static isAdmin() {
    const user = this.getCurrentUser();
    return this.isAuthenticated() && user.role === "ADMIN";
  }

  static getAccountRoute() {
    if (!this.isAuthenticated()) return "/auth";
    return this.isAdmin() ? "/admin" : "/user";
  }
}
