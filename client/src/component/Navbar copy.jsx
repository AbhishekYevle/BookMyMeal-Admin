import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo_white from '../images/logo-white.svg'

// const calendarApi = `${process.env.CLIENT_API}/calendar`;
// const bookingApi = `${process.env.CLIENT_API}/bookinglist`;
// const userApi = `${process.env.CLIENT_API}/userlist`

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('calendar'); 
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    // sessionStorage.removeItem('isAuthenticated');
    toast.success('Logged Out!');
    navigate('/');
  };

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
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${activeLink === 'calendar' ? 'active' : ''}`}>
                <a className="nav-link" onClick={() => handleLinkClick('calendar')} href="http://localhost:5173/calendar">
                  Calendar
                </a>
              </li>
              <li className={`nav-item ${activeLink === 'booking' ? 'active' : ''}`}>
                <a className="nav-link" onClick={() => handleLinkClick('booking')} href="http://localhost:5173/bookinglist">
                  Booking List
                </a>
              </li>
              <li className={`nav-item ${activeLink === 'admin' ? 'active' : ''}`}>
                <a className="nav-link" onClick={() => handleLinkClick('admin')} href="http://localhost:5173/userlist">
                  Admin List
                </a>
              </li>
            </ul> */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="http://localhost:5173/calendar">
                    Calendar
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link Active" href="http://localhost:5173/bookinglist">
                    Booking List
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link Active" aria-current="page" href="http://localhost:5173/userlist">
                    User List
                  </a>
                </li>
              </ul>
              <div className="h-100 d-lg-inline-flex align-items-center">
                <ul className="app-nav">
                  {/* Notification Menu */}
                  <li className="dropdown">
                    <a
                      className="app-nav__item notification-num"
                      href="#"
                      data-toggle="dropdown"
                      aria-label="Show notifications"
                    >
                      <i className="icon-bell"></i> <span className="num">5</span>
                    </a>
                  </li>
                  {/* User Menu */}
                  <li className="dropdow">
                    <a
                      className="app-nav__item dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-label="Open Profile Menu"
                    >
                      Admin
                    </a>
                    <ul className="dropdown-menu settings-menu dropdown-menu-right">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-toggle="modal"
                          data-target="#changepwdModal"
                        >
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;