
export class RegisterView {
    render() {
        const content = document.querySelector("#app-content");

        if (content) {
            content.innerHTML = `
                <div style="max-width: 400px; margin: 50px auto; padding: 20px;">

                    <h2 style="text-align: center;">Đăng ký tài khoản</h2>

                    <form id="register-form">

                        <div style="margin-bottom: 15px;">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nhập họ và tên"
                                required
                                style="width: 100%; padding: 10px; box-sizing: border-box;"
                            >
                        </div>

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

        <div style="margin-bottom: 15px;">
            <label>Nhập lại mật khẩu</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                required
                style="width: 100%; padding: 10px; box-sizing: border-box;"
            >
        </div>

        <button type="submit" style="width: 100%; padding: 10px;">
            Đăng ký
        </button>

    </form>

    <p style="text-align: center;">
        Đã có tài khoản?
        <a href="#/login">Đăng nhập</a>
    </p>

</div>
`;

            const form = document.querySelector("#register-form");

            form.onsubmit = function(event) {
                event.preventDefault();

                const name = document.querySelector("#name").value;
                const email = document.querySelector("#email").value;
                const password = document.querySelector("#password").value;
                const confirmPassword = document.querySelector("#confirmPassword").value;

                if (password !== confirmPassword) {
                    alert("Mật khẩu nhập lại không khớp!");
                    return;
                }

                alert("Đăng ký thành công! Xin chào " + name);
            };
        }
    }
}
