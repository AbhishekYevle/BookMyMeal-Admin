import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/main.css';
import Navbar from '../component/Navbar';
import ChangePasswordModal from '../component/ChangePasswordModal';
import AddBooking from '../component/AddBooking';
import Footer from '../component/Footer';
import axios from 'axios';

const Content = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/bookinglist`)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching booking list:', error.response.data));
  }, []);

  return (
    <div className="container-fluid">
        <div className="container pt-30 mb-30">
          <div className="container-head">
            <div className="container-left">
              <h3 className="container-title">Booking List</h3>
            </div>
            <div className="container-right">
              <a
                href="#"
                aria-label="Add Booking"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addBookingModal"
              >
                Add Booking
              </a>
            </div>
          </div>
          <div className="content-tab">
            <a className="content-tab_link active" href="#">
              Rishabh Employees
            </a>
            <a className="content-tab_link" href="#">
              Others
            </a>
          </div>
          <table className="table table-hover responsive nowrap table-bordered">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Meal Type</th>
                        <th>Start Date</th>
                        <th>Employee Name</th>
                        <th>Notes</th>
                        <th>Booking Counts</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr>
                            <td>{booking.bookingData._id}</td>
                            <td>{booking.bookingData.mealType}</td>
                            <td>{new Date(booking.bookingData.startDate).toLocaleDateString('en-IN')} - {new Date(booking.bookingData.endDate).toLocaleDateString('en-IN')}</td>
                            <td>{booking.bookingData.employeeNames}</td>
                            <td>{booking.bookingData.notes}</td>
                            <td>{booking.bookingData.bookingCount}</td>
                        </tr>
                    ))}
                </tbody>
            
          </table>
        </div>
      </div>
  );
};


const BookingList = () => {
  return (
    <div>
      <Navbar />
      <Content />
      <Footer />
      <ChangePasswordModal />
      <AddBooking />
    </div>
  );
};

export default BookingList;
// jsx
// <a
//   className="app-nav__item dropdown-toggle"
//   href="#"
//   role="button"
//   data-bs-toggle="dropdown" // Add this attribute
//   aria-expanded="false"
// >
//   Admin
// </a>
// html
// <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>

import React from 'react';
import logo_white from '../images/logo-white.svg'
// import Navbar from '../component/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <div className="container head">
            <a href="#" className="navbar-brand">
              <div className="logoW-wrapper">
                <img src={logo_white} alt="Rishabh Software" />
                <span>Meal Facility</span>
              </div>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="http://localhost:5173/calendar">
                    Calendar
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="http://localhost:5173/bookinglist">
                    Booking List
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:5173/userlist">
                    Admin List
                  </a>
                </li>
              </ul>
              <div className="h-100 d-lg-inline-flex align-items-center">
                <ul className="app-nav">
                  {/* Notification Menu */}
                  <li className="dropdown">
                    <a className="app-nav__item notification-num" href="#" onClick={toggleNotificationDropdown}>
                      <i className="icon-bell"></i>
                      <span className="num">5</span>
                    </a>
                    {notificationDropdownOpen && (
                      <ul className="dropdown-menu settings-menu dropdown-menu-left notification-dropdown">
                        <li>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Logout
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  {/* User Menu */}
                  <li className="dropdown">
                    <a
                      className="app-nav__item dropdown-toggle"
                      href="#"
                      onClick={toggleUserDropdown} // Toggle the user dropdown
                    >
                      Admin
                    </a>
                    {userDropdownOpen && (
                      <ul className="dropdown-menu settings-menu dropdown-menu-left user-dropdown">
                        <li>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
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
  return (
    <div>
    <div class="container-fluid">
      <div class="container pt-30 mb-30">
        <div class="container-head">
          <div class="container-left">
            <h3 class="container-title">Booking List</h3>
          </div>
          <div class="container-right">
            <a href="#" aria-label="Add Booking" class="btn btn-primary" data-toggle="modal" data-target="#addBookingModal">
              Add Booking
            </a>
          </div>
        </div>
        <div class="content-tab">
          <a class="content-tab_link active" href="#">
            Rishabh Employees
          </a>
          <a class="content-tab_link" href="#">
            Others
          </a>
        </div>
      </div>
    </div></div>
  );
};

const Footer = () => {
  return (
    <div class="footer">
      <div class="container">
        <div class="footer-block">
          <p>Copyright © 2022 Rishabh Software. All Rights Reserved.</p>
          <div class="social">
            <a href="#" aria-label="Facebook">
              <i class="icon-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i class="icon-instagram"></i>
            </a>
            <a href="#" aria-label="Linkedin">
              <i class="icon-linkedin"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i class="icon-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangePasswordModal = () => {
  return (
    <div class="modal fade" id="changepwdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Change Password
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  Old Password<span class="extric">*</span>
                </label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  New Password<span class="extric">*</span>
                </label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  Confirm Password<span class="extric">*</span>
                </label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                <div class="error-block">Error display here</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddBookingModal = () => {
  return (
    <div class="modal fade side-modal" id="addBookingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Book a Meal
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group custom-radio">
              <label>Select Catagory</label>
              <div class="d-flex align-content-center justify-content-start">
                <div class="radio-block">
                  <input type="radio" id="test1" name="radio-group" checked />
                  <label for="test1" class="mr-0">
                    Employees
                  </label>
                </div>
                <div class="radio-block">
                  <input type="radio" id="test2" name="radio-group" checked />
                  <label for="test2" class="mr-0">
                    Non Employees
                  </label>
                </div>
                <div class="radio-block">
                  <input type="radio" id="test3" name="radio-group" checked />
                  <label for="test3" class="mr-0">
                    Custom Booking
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group custom-radio">
              <label>Select Catagory</label>
              <div class="d-flex align-content-center justify-content-start">
                <div class="radio-block">
                  <input type="radio" id="test4" name="radio-group" checked />
                  <label for="test4" class="mr-0">
                    Lunch
                  </label>
                </div>
                <div class="radio-block">
                  <input type="radio" id="test5" name="radio-group" checked />
                  <label for="test5" class="mr-0">
                    Dinner
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group mb-30">
              <label class="custom-checkbox mb-0">
                <span class="checkbox__title">Weekend</span>
                <input class="checkbox__input" type="checkbox" />
                <span class="checkbox__checkmark"></span>
              </label>
            </div>
            <div class="form-group">
              <label>
                Select Date (s)
              </label>
              <div class="input-group date-picker-input">
                <input type="text" class="form-control border-right-0" placeholder="Select Date" id="demoDate" />
                <div class="input-group-append bg-transparent">
                  <span class="input-group-text bg-transparent" id="basic-addon2">
                    <i class="icon-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>
                Select Account
              </label>
              <div class="search-wrapper">
                <input type="text" class="form-control" placeholder="Search Department.." />
                <i class="icon-search search-icon"></i>
              </div>
            </div>
            <div class="form-group">
              <label>
                Notes
              </label>
              <textarea class="form-control" rows="4" placeholder="Type here.."></textarea>
            </div>
            <div class="form-group">
              <label>
                Booking Count
              </label>
              <input type="text" class="form-control" placeholder="100" />
            </div>
            <div class="form-group">
              <label>
                Select Employees
              </label>
            </div>
            <div class="table-responsive">
              <table class="table table-hover responsive nowrap table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div class="form-group mb-0">
                        <label class="custom-checkbox">
                          <input class="checkbox__input" type="checkbox" />
                          <span class="checkbox__checkmark"></span>
                        </label>
                      </div>
                    </th>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="form-group mb-0">
                        <label class="custom-checkbox m-0">
                          <input class="checkbox__input" type="checkbox" />
                          <span class="checkbox__checkmark"></span>
                        </label>
                      </div>
                    </td>
                    <td>2001</td>
                    <td>Thomas</td>
                    <td>Analytics</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group mb-0">
                        <label class="custom-checkbox m-0">
                          <input class="checkbox__input" type="checkbox" />
                          <span class="checkbox__checkmark"></span>
                        </label>
                      </div>
                    </td>
                    <td>2001</td>
                    <td>Thomas</td>
                    <td>Analytics</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group mb-0">
                        <label class="custom-checkbox m-0">
                          <input class="checkbox__input" type="checkbox" />
                          <span class="checkbox__checkmark"></span>
                        </label>
                      </div>
                    </td>
                    <td>2001</td>
                    <td>Thomas</td>
                    <td>Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary">
              Cancel
            </button>
            <button type="button" class="btn btn-primary">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const bookingList = () => {
  return (
    <div>
      <Navbar />
      <Content />
      <Footer />
      <ChangePasswordModal />
      <AddBookingModal />
    </div>
  );
};

export default bookingList;
