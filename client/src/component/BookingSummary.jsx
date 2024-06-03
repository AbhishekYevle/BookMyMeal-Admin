import React from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '../images/add-btn-2.svg';
import moment from 'moment';

const BookingSummary = ({ selectedDate, events }) => {
  const getBookingCounts = () => {
    if (!selectedDate) return { employees: 0, nonEmployees: 0, customBookings: 0 };

    let employees = 0;
    let nonEmployees = 0;
    let customBookings = 0;

    events.forEach(event => {
      if (moment(event.start).format('YYYY-MM-DD') === selectedDate) {
        switch (event.category) {
          case 'employee':
            employees++;
            break;
          case 'nonEmployee':
            nonEmployees++;
            break;
          case 'customBooking':
            customBookings++;
            break;
          default:
            break;
        }
      }
    });

    return { employees, nonEmployees, customBookings };
  };

  const bookingCounts = getBookingCounts();
  const formattedSelectedDate = selectedDate ? moment(selectedDate).format('dddd, DD MMM YYYY') : '';

  return (
    <div className="tile">
      <h3 className="tile-title">{formattedSelectedDate}</h3>
      <div className="booking-wrapper">
        <div className="booking-block">
          <h5>Bookings</h5>
          <a href="#" aria-label="Add Employees"><img src={Add} alt="Add" /></a>
        </div>
        <div className="booking-block employees">
          <div className="booking-block-lt">
            <div className="icon-block"><i className="icon-employees"></i></div>
            <div className="info-block">
              <h5>Employees</h5>
              <h3>{bookingCounts.employees}</h3>
            </div>
          </div>
          <a href="#" aria-label="Add Employees"><img src={Add} alt="Add" /></a>
        </div>
        <div className="booking-block non-employees">
          <div className="booking-block-lt">
            <div className="icon-block"><i className="icon-employees"></i></div>
            <div className="info-block">
              <h5>Non Employees</h5>
              <h3>{bookingCounts.nonEmployees}</h3>
            </div>
          </div>
          <a href="#" aria-label="Add Employees"><img src={Add} alt="Add" /></a>
        </div>
        <div className="booking-block buffer">
          <div className="booking-block-lt">
            <div className="icon-block"><i className="icon-buffer"></i></div>
            <div className="info-block">
              <h5>Custom Bookings</h5>
              <h3>{bookingCounts.customBookings}</h3>
            </div>
          </div>
          <a href="#" aria-label="Add Buffer"><img src={Add} alt="Add" /></a>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
