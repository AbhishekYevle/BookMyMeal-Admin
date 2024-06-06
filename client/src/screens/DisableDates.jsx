import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../component/Navbar';
import AddDisabledDate from "../component/AddDisableDate";
import ChangePasswordModal from "../component/ChangePasswordModal";
import Footer from "../component/Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const Content = () => {
  const [disabledDates, setDisabledDates] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      toast.success('Logged Out!');
      navigate('/');
  };
  
  useEffect(() => {
      const fetchDisabledDates = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:5000/api/disableddates', { headers: { Authorization: token } });
              setDisabledDates(response.data);
          } catch (error) {
              console.error('Error fetching disabled dates', error);
              if (error.response && error.response.data.error === 'Failed to authenticate token') {
                  alert('Failed to authenticate token. Please re-login.');
                  handleLogout();
              } else {
                  toast.error('Failed to fetch disabled dates');
              }
          }
      };
  
      fetchDisabledDates();
  }, []);
  
  const handleDelete = async (id) => {
      try {
          const token = localStorage.getItem('token');

          await axios.post(`http://localhost:5000/api/deletedisabledate`, id, { headers: { Authorization: token } });
          setDisabledDates(disabledDates.filter(date => date._id !== id));
          alert('Date deleted successfully');
          toast.success('Date deleted successfully');
      } catch (error) {
          console.error('Error deleting disabled date', error);
          if (error.response && error.response.data.error === 'Failed to authenticate token') {
              alert('Failed to authenticate token. Please re-login.');
              handleLogout();
          } else {
              toast.error('Failed to delete date');
          }
      }
  };

  return (
      <>
          <div className="container-fluid">
              <div className="container pt-30 mb-30">
                  <div className="container-head">
                      <div className="container-left">
                          <h3 className="container-title">Disabled Dates List</h3>
                      </div>
                      <div className="container-right">
                          <a
                              href="#"
                              aria-label="Add Booking"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#addBookingModal"
                          >
                              Disable Date
                          </a>
                      </div>
                  </div>
                  <table className="table">
                      <thead>
                          <tr>
                              <th>Date</th>
                              <th>Reason</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {disabledDates.map((date) => (
                              <tr key={date._id}>
                                  <td>
                                      {new Date(date.date).toLocaleDateString('en-IN')}
                                  </td>
                                  <td>{date.reason}</td>
                                  <td>
                                      <a href="#" className="delete-link" aria-label="Delete" onClick={() => handleDelete(date._id)}>
                                          <FaTrash />
                                      </a>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </>
  );
};

const DisableDates = () => {
    return(
        <div>
            <Navbar />
            <Content />
            <ChangePasswordModal />
            <AddDisabledDate />
            <Footer />
        </div>
    )
}
export default DisableDates;