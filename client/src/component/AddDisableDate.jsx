import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";

// const server = process.env.SERVER_API;
// const client = process.env.CLIENT_API;

const AddDisabledDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reason, setReason] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getDates = (startDate, endDate) => {
      const dates = [];
      let currentDate = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set end date to the maximum time

      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    const dates = startDate && endDate ? getDates(startDate, endDate) : [];

    const dateData = {
      dates: dates.map(date => date.toISOString().slice(0, 10)), 
      reason
    }

    console.log(dateData);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://43.205.144.105:5000/api/adddisableddates',dateData, { headers: { Authorization: token } });
      document.getElementById('closeButton').click();
      alert(response.data.msg);
      window.location.reload();
      toast.success('Date Disabled successfully');
    } catch (error) {
      console.error('Error in Disable Date:', error);
      alert('Failed to Disable Date');
    }

  };


    return (
      <div className="modal fade side-modal" id="addBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add Disable Dates</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeButton" >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group custom-radio">
          <div className="form-group">
              <label>Select Date Range</label>
              <div className="date-picker-input" onClick={toggleCalendar}>
                <input
                  type="text"
                  className="form-control border-right-0"
                  placeholder="Select Date"
                  value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ''}
                  readOnly
                />
              </div>
              {showCalendar && (
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  dateFormat="dd-MM-yyyy"
                  // filterDate={isWeekday}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="form-group">
                <label>Reason</label>
                <textarea className="form-control" rows="4" placeholder="Type here.." onChange={handleReasonChange}></textarea>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-primary">Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </div>
    );
  };

  export default AddDisabledDate;