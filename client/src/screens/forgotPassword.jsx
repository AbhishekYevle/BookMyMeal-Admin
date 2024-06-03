import React, { useState } from 'react';
import axios from 'axios';
import '../css/main.css';
import logo from '../images/logo.svg';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://43.205.144.105:5000/api/forgotpassword`, { email });
      // toast.success('Password reset link sent to your email!');
      alert('Password reset link sent to your email!');
    } catch (error) {
      console.error(error);
      // toast.error('An error occurred while sending the reset link.');
      alert('An error occurred while sending the reset link.');
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
            <h3 className="login-head">Forgot Password?</h3>
            <p className="login-text">Enter the email below to continue.</p>
            <div className="form-group">
              <label className="control-label">Email</label>
              <div className="input-addon">
                <input 
                  className="form-control" 
                  type="text" 
                  name="email" 
                  placeholder="Robert@rishabhsoft.com"
                  value={email}
                  onChange={handleEmailChange} 
                  autoFocus 
                />
                <div className="icon-after icon-green"><i className="icon-check"></i></div>
              </div>
            </div>
            <div className="form-group btn-container">
              <button type="submit" className="btn btn-xl btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;