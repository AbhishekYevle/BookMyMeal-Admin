import React from 'react';
import '../css/main.css';
import logo from '../images/logo.svg';

const ForgotPasswordForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    // Add your logic to handle the email submission
    console.log('Email submitted:', email);
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
                <input className="form-control" type="text" name="email" placeholder="Robert@rishabhsoft.com" autoFocus />
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