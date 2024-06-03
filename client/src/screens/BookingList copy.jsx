import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import ChangePasswordModal from '../component/ChangePasswordModal';
import AddBooking from '../component/AddBooking';
import Footer from '../component/Footer';
import axios from 'axios';

const Content = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('RishabhEmployees');
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const response = await axios.get(`http://localhost:5000/api/bookinglist`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking list:', error.response.data);
      }
    };

    fetchBookings();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = view === 'RishabhEmployees'
    ? bookings.filter(booking => booking.category === 'employee').slice(indexOfFirstRecord, indexOfLastRecord)
    : bookings.filter(booking => ['nonEmployee', 'customBooking'].includes(booking.category)).slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(
    view === 'RishabhEmployees'
      ? bookings.filter(booking => booking.category === 'employee').length / recordsPerPage
      : bookings.filter(booking => ['nonEmployee', 'customBooking'].includes(booking.category)).length / recordsPerPage
  );

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
          <a
            className={`content-tab_link ${view === 'RishabhEmployees' ? 'active' : ''}`}
            href="#"
            onClick={() => setView('RishabhEmployees')}
          >
            Rishabh Employees
          </a>
          <a
            className={`content-tab_link ${view === 'Others' ? 'active' : ''}`}
            href="#"
            onClick={() => setView('Others')}
          >
            Others
          </a>
        </div>
        <table className="table table-hover responsive nowrap table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Meal Type</th>
              {view === 'RishabhEmployees' && <th>Employee ID</th>}
              {view === 'RishabhEmployees' && <th> Employee Name</th>}
              {view === 'RishabhEmployees' && <th> Department</th>}
              {/* {view === 'RishabhEmployees' && <th>Last Name</th>} */}
              <th>Dates</th>
              {view !== 'RishabhEmployees' && <th>Notes</th>}
              {view !== 'RishabhEmployees' && <th>Booking Count</th>}
              {view !== 'RishabhEmployees' && <th>Booking Name</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.category}</td>
                <td>{booking.mealType}</td>
                {view === 'RishabhEmployees' && (
                  <>
                    <td>{booking.employees[0].empId}</td>
                    <td>{booking.employees[0].firstName} {booking.employees[0].lastName}</td>
                    <td>{booking.employees[0].department}</td>
                  </>
                )}
                {/* <td>{new Date(booking.startDate).toLocaleDateString('en-IN')}</td>
                <td>{new Date(booking.endDate).toLocaleDateString('en-IN')}</td> */}
                <td>
                  {booking.dates.map((date, index) => (
                    <span key={index}>{new Date(date).toLocaleDateString('en-IN')}, </span>
                  ))}
                </td>
                {view !== 'RishabhEmployees' && (
                  <>
                    <td>{booking.notes}</td>
                    <td>{booking.bookingCount}</td>
                    <td>{booking.bookingName || 'NA'}</td>
                  </>
                )}
                <td><a href="#" className="delete-link" aria-label="Delete">
                      <FaTrash />
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {[...Array(totalPages).keys()].map(number => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <a onClick={() => handlePageChange(number + 1)} className="page-link" href="#">
                  {number + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
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
