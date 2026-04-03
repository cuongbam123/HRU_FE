import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";

const LoginSignup = ({ setIsLoggedIn, setFullname }) => {
  // Nhận từ App
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });

  useEffect(() => {
    console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { username: formData.username, password: formData.password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("fullname", res.data.fullname); // Lưu fullname

      alert("Đăng nhập thành công!");
      setIsLoggedIn(true); // Cập nhật login cho App
      // setFullname(res.data.fullname); // Cập nhật fullname lên App
      navigate("/");
    } catch (err) {
      console.error(
        "Lỗi đăng nhập:",
        err.response ? err.response.data : err.message
      );
      alert("Sai tên người dùng hoặc mật khẩu!");
    }
  };

  const handleSignup = async () => {
    try {
      console.log("Dữ liệu gửi đi:", formData);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          username: formData.username,
          password: formData.password,
          fullname: formData.fullname,
          email: formData.email,
        }
      );
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setState("Login");
      setFormData({ username: "", password: "", fullname: "", email: "" });
    } catch (err) {
      console.error(
        "Lỗi đăng ký:",
        err.response ? err.response.data : err.message
      );
      alert("Đăng ký thất bại. Vui lòng thử lại hoặc kiểm tra thông tin.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-signup-modern">
      <div
        className={`login-signup-container ${
          state === "Sign Up" ? "signup-mode" : ""
        }`}
      >
        {/* Left panel: Form */}
        <div className="login-signup-form-panel">
          <h2>{state === "Sign Up" ? "Create Account" : "Sign In"}</h2>
          <div className="login-signup-social">
            <button className="social-btn ggl">G+</button>
            <button className="social-btn fb">f</button>
          </div>
          <span className="login-signup-or">
            or use your{" "}
            {state === "Sign Up" ? "email for registration" : "email password"}
          </span>
          <form className="login-signup-form" onSubmit={handleSubmit}>
            {state === "Sign Up" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="User Name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            {state === "Login" && (
              <input
                type="text"
                placeholder="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {state === "Login" && (
              <span className="login-signup-forgot">Forget Your Password?</span>
            )}
            <button type="submit" className="login-signup-submit">
              {state === "Sign Up" ? "SIGN UP" : "SIGN IN"}
            </button>
          </form>
        </div>
        {/* Right panel: Switcher */}
        <div className="login-signup-side-panel">
          {state === "Sign Up" ? (
            <>
              <h2>Welcome Back!</h2>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="login-signup-switch"
                onClick={() => {
                  setState("Login");
                  setFormData({
                    username: "",
                    password: "",
                    fullname: "",
                    email: "",
                  });
                }}
              >
                SIGN IN
              </button>
            </>
          ) : (
            <>
              <h2>Hello, Friend!</h2>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="login-signup-switch"
                onClick={() => {
                  setState("Sign Up");
                  setFormData({
                    username: "",
                    password: "",
                    fullname: "",
                    email: "",
                  });
                }}
              >
                SIGN UP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
