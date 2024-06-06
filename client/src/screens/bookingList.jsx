import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import ChangePasswordModal from '../component/ChangePasswordModal';
import AddBooking from '../component/AddBooking';
import Footer from '../component/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import '../css/bookingList.css';

const Content = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('RishabhEmployees');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const recordsPerPage = 10;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    toast.success('Logged Out!');
    navigate('/');
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/bookinglist`, { headers: { Authorization: token } });
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error('Error fetching booking list:', error.response.data);
      if (error.response.data.error === 'Failed to authenticate token') {
        alert('Failed to authenticate token. Please re-login.');
        handleLogout(); 
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/deletebooking`, { bookingId }, { headers: { Authorization: token } });
      setFilteredBookings(filteredBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error.response.data);
      if (error.response.data.error === 'Failed to authenticate token') {
        alert('Failed to authenticate token. Please re-login.');
        handleLogout(); 
      } else {
        toast.error('Failed to Delete Booking');
      }
    }
  };

  const handleFilter = () => {
    if (month && year) {
      const filtered = bookings.filter(booking => {
        return booking.dates.some(date => {
          const bookingDate = new Date(date);
          return bookingDate.getMonth() + 1 === parseInt(month) && bookingDate.getFullYear() === parseInt(year);
        });
      });
      setFilteredBookings(filtered);
    } else {
      toast.error('Please enter both month and year');
    }
  };

  const handleReset = () => {
    setFilteredBookings(bookings);
    setMonth('');
    setYear('');
  };

  const handleExport = () => {
    const dataToExport = filteredBookings.map(booking => {
      const { category, mealType, employees, dates, notes, bookingCount, bookingName } = booking;
      return {
        Category: category,
        'Meal Type': mealType,
        'Employee ID': employees?.[0]?.empId || '',
        'Employee Name': employees?.[0] ? `${employees[0].firstName} ${employees[0].lastName}` : '',
        Department: employees?.[0]?.department || '',
        Dates: dates.map(date => new Date(date).toLocaleDateString('en-IN')).join(', '),
        Notes: notes || '',
        'Booking Count': bookingCount || '',
        'Booking Name': bookingName || 'NA'
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    XLSX.writeFile(workbook, 'Bookings.xlsx');
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = view === 'RishabhEmployees'
    ? filteredBookings.filter(booking => booking.category === 'employee').slice(indexOfFirstRecord, indexOfLastRecord)
    : filteredBookings.filter(booking => ['nonEmployee', 'customBooking'].includes(booking.category)).slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(
    view === 'RishabhEmployees'
      ? filteredBookings.filter(booking => booking.category === 'employee').length / recordsPerPage
      : filteredBookings.filter(booking => ['nonEmployee', 'customBooking'].includes(booking.category)).length / recordsPerPage
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
          <div className="filter-container">
            <input 
              type="text" 
              placeholder="Month (MM)" 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Year (YYYY)" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
            />
            <button className="btn custom-button" onClick={handleFilter}>Filter</button>
            <button className="btn custom-button" onClick={handleReset}>Reset</button>
            <button className="btn custom-button" onClick={handleExport}>Export to Excel</button>
          </div>
        <table className="table table-hover responsive nowrap table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Meal Type</th>
              {view === 'RishabhEmployees' && <th>Employee ID</th>}
              {view === 'RishabhEmployees' && <th> Employee Name</th>}
              {view === 'RishabhEmployees' && <th> Department</th>}
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
                    <td>{booking.employees[0]?.empId}</td>
                    <td>{booking.employees[0] ? `${booking.employees[0].firstName} ${booking.employees[0].lastName}` : ''}</td>
                    <td>{booking.employees[0]?.department}</td>
                  </>
                )}
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
                <td>
                  <a href="#" className="delete-link" aria-label="Delete" onClick={() => handleDelete(booking._id)}>
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
