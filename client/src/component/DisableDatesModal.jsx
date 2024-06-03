import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const DisableDatesModal = ({ showModal, toggleModal }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleOldPasswordChange = (e) => {
      setOldPassword(e.target.value);
    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    }
  return (
    <>
      <div
          className="modal fade"
          id="changepwdModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change Password
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="oldPassword">
                      Old Password<span className="extric">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      onChange={handleOldPasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">
                      New Password<span className="extric">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm Password<span className="extric">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                    />
                    <div className="error-block">Error display here</div>
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
        </div>
    </>
  );
};

export default DisableDatesModal;
