import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.svg';

// const server = process.env.SERVER_API;
// const forgotPasswordApi = `${process.env.CLIENT_API}/bookinglist`;
// const userApi = `${process.env.CLIENT_API}/userlist`

const SignIn = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const url = `http://localhost:5000/api/admin/signin`;
      const response = await axios.post(url, data);
      console.log(response.data.msg); // Assuming your backend sends a 'msg' field

      if (response.data.isError === false) {
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/userlist');
    } else {
      toast.error('Invalid email or password');
    }

      // window.location.href = `${userApi}`;
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.msg);
      }
    }
  };

  return (
    <section className="login-content">
      <div className="login-content-lt"></div>
      <div className="login-content-rt">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="logo-wrapper">
              <img src={logo} alt="Rishabh Software" />
              <span>Meal Facility</span>
            </div>
            <h3 className="login-head">Sign in to your account</h3>
            <p className="login-text">Enter your credentials to access your account.</p>
            <div className="form-group">
              <label className="control-label">Email</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  placeholder="bookmymeal@rishabhsoft.com"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  autoFocus
                />
                <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <div className="input-addon">
                <input
                  id="password-field"
                  className="form-control"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                //   value="password"
                />
                <span
                  toggle="#password-field"
                  className={`icon-eye-close field-icon toggle-password ${
                    passwordShown ? "icon-eye-open" : ""
                  }`}
                  onClick={togglePassword}
                ></span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-group mb-0">
                <label className="custom-checkbox mb-0">
                  <span className="checkbox__title">Remember Me</span>
                  <input className="checkbox__input" type="checkbox" />
                  <span className="checkbox__checkmark"></span>
                </label>
              </div>
              <div className="form-group mb-0">
                <div className="utility">
                  <p>
                    <a href="http://localhost:5173/forgotpassword" className="form-link">
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {error && <div>{error}</div>}
            <div className="form-group btn-container">
              <button type="submit" className="btn btn-xl btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;