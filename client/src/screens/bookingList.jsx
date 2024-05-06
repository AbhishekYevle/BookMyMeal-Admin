import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/main.css';
import Navbar from '../component/Navbar';
import ChangePassword from '../component/ChangePassword';
import AddBooking from '../component/AddBooking';
import Footer from '../component/Footer';

const Content = () => {
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
      <ChangePassword />
      <AddBooking />
    </div>
  );
};

export default BookingList;
