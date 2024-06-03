import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.svg';
import '../css/changePassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  
  const handleSubmit = () => {
    console.log('hello');
    if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }

    axios.patch(`http://43.205.144.105:5000/api/resetpassword?email=${email}`, { newPassword })
        .then((response) => {
          // toast.success('Password changed successfully');
          alert('Password changed successfully');
          navigate('/'); 
        })
        .catch((error) => {
            console.error('Error changing password:', error.response.data);
        });
  };
    return ( 
        <>
          <div className="modal-dialog modal-dialog-centered changePassword" role="document">
            <div className="modal-content">
              <div className="modal-logo">
                <img src={logo} alt="Rishabh Software" />
                <h4>Meal Facility</h4>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Reset Password
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      New Password<span className="extric">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm Password<span className="extric">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </>
    )
}

export default ResetPassword;