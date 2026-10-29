
export class LoginView {
    render() {
        const content = document.querySelector("#app-content");

        if (content) {
            content.innerHTML = `
                <div style="max-width: 400px; margin: 50px auto; padding: 20px;">
                    <h2 style="text-align: center;">Đăng nhập</h2>

                    <form id="login-form">
                        <div style="margin-bottom: 15px;">
                            <label>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Nhập email"
                                required
                                style="width: 100%; padding: 10px; box-sizing: border-box;"
                            >
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Nhập mật khẩu"
                                required
                                style="width: 100%; padding: 10px; box-sizing: border-box;"
                            >
                        </div>

                        <button type="submit" style="width: 100%; padding: 10px;">
                            Đăng nhập
                        </button>
                    </form>

                    <p style="text-align: center;">
                        Chưa có tài khoản?
                        <a href="#/register">Đăng ký</a>
                    </p>
                </div>
            `;

            const form = document.querySelector("#login-form");

            form.onsubmit = function(event) {
                event.preventDefault();

                const email = document.querySelector("#email").value;
                const password = document.querySelector("#password").value;

                alert("Bạn đã nhập email: " + email);
            };
        }
    }
}
