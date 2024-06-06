import { Axios } from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ChangePasswordModal = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    // sessionStorage.removeItem('isAuthenticated');
    toast.success('Logged Out!');
    navigate('/');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!oldPassword || !newPassword || !confirmPassword){
      alert('Please Fill all the fields!');
    }

    if (newPassword !== confirmPassword) {
      alert('Password does not Match!');
      // toast.success('Password does not Match!');
    } else {
      try {

        const token = localStorage.getItem('token');

        const response = await axios.patch('http://localhost:5000/api/changepassword', {
          oldPassword,
          newPassword,
        },
        { 
          headers: { 
            Authorization: token 
          } 
        });
        document.getElementById('closeButton').click();
        toast.success(response.data.msg);
        window.location.reload();
      } catch (error) {
        console.error('Error changing password:', error);
        if (error.response && error.response.data && error.response.data.error === 'Failed to authenticate token') {
          alert('Failed to authenticate token. Please re-login.');
          handleLogout(); 
        } else {
          toast.error('Failed to change password');
        }
      }
    };
  };
    return (
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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
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
                      onChange={handleConfirmPasswordChange}
                    />
                    {/* <div className="error-block">Error display here</div> */}
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
    );
  };

  export default ChangePasswordModal;