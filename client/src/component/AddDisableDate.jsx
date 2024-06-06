import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDisabledDate = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    toast.success('Logged Out!');
    navigate('/');
  };

  const handleSubmit = async () => {
    const dateData = {
      date: selectedDate,
      reason
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/adddisableddates', dateData, { headers: { Authorization: token } });
      alert(response.data.msg);
      window.location.reload();
      toast.success('Date Disabled successfully');
    } catch (error) {
      console.error('Error in Disable Date:', error);
      alert('Failed to Disable Date');
      if (error.response.data.error === 'Failed to authenticate token') {
        alert('Failed to authenticate token. Please re-login.');
        handleLogout(); 
      } else {
        toast.error('Failed to add disabled date');
      }
    }
  };

  return (
    <div className="modal fade side-modal" id="addBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Disable Dates</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea className="form-control" rows="4" placeholder="Type here.." value={reason} onChange={handleReasonChange}></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDisabledDate;
