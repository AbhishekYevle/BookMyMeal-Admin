import React, { useState, useEffect } from "react";
import axios from "axios";
import logo_white from '../images/logo-white.svg';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <div class="container head">
          <a href="#" class="navbar-brand">
            <div class="logoW-wrapper">
              <img src={logo_white} alt="Rishabh Software" />
              <span>Meal Facility</span>
            </div>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:5173/calendar">Calendar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:5173/bookinglist">Booking List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="http://localhost:5173/userlist">User List</a>
              </li>
            </ul>
            <div class="h-100 d-lg-inline-flex align-items-center">
              <ul class="app-nav">
                {/* Notification Menu */}
                <li class="dropdown">
                  <a class="app-nav__item notification-num" href="#" onClick={toggleDropdown}>
                    <i class="icon-bell"></i>
                    <span class="num">5</span>
                  </a>
                  {dropdownOpen && (
                    <ul class="dropdown-menu settings-menu dropdown-menu-left">
                      <li>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* User Menu */}
                <li class="dropdown">
                  <a class="app-nav__item dropdown-toggle" href="#" onClick={toggleDropdown}>
                    Admin
                  </a>
                  {dropdownOpen && (
                    <ul class="dropdown-menu settings-menu dropdown-menu-left">
                      <li>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};


const Content = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/userlist")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="container pt-30 mb-30">
        <div className="container-head">
          <div className="container-left">
            <h3 className="container-title">User List</h3>
          </div>
          <div className="container-right">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addUserModal"
              onClick={openModal}
            >
              Add User
            </button>
          </div>
        </div>
        <div className="content-tab">
          <a className="content-tab_link active" href="#">
            Admins
          </a>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone No.</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
            {/* key={user.id} */}
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <AddUserModal closeModal={closeModal} />}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-block">
          <p>Copyright © 2022 Rishabh Software. All Rights Reserved.</p>
          <div className="social">
            <a href="#" aria-label="Facebook">
              <i className="icon-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="icon-instagram"></i>
            </a>
            <a href="#" aria-label="Linkedin">
              <i className="icon-linkedin"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="icon-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangePasswordModal = () => {
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
                <label htmlFor="exampleInputPassword1">
                  Old Password<span className="extric">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  New Password<span className="extric">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
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
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddUserModal = ({ closeModal }) => {
  const handleCancel = () => {
    // Add functionality to handle cancel button click
    console.log('Cancel button clicked');
    closeModal();
  };

  const handleBook = () => {
    // Add functionality to handle book button click
    console.log('Book button clicked');
    closeModal();
  };

  return (
    <div
      className="modal fade side-modal"
      id="addUserModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Book a Meal
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Add your form fields here */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleBook}
              >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  return (
    <div>
    <Navbar />
    <Content />  
    <Footer />  
    <ChangePasswordModal />  
    <AddUserModal />  
    </div>
  );
};

export default UserList;