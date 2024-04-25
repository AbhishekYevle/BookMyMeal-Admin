import logo_white from '../images/logo-white.svg'
import { useState, useEffect } from 'react';
import '../css/main.css';

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
                <a class="nav-link active" href="http://localhost:5173/bookinglist">Booking List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:5173/userlist">User List</a>
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

export default Navbar;