import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const server = process.env.SERVER_API;

const AddBooking = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/userlist`)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);


    return (
      <div className="modal fade side-modal" id="addBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Book a Meal</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group custom-radio">
            <label>Select Catagory</label>
            <div className="d-flex align-content-center justify-content-start">
              <div className="radio-block">
                <input type="radio" id="test1" name="radio-group" defaultChecked />
                <label htmlFor="test1" className="mr-0">Employees</label>
              </div>
              <div className="radio-block">
                <input type="radio" id="test2" name="radio-group" defaultChecked />
                <label htmlFor="test2" className="mr-0">Non Employees</label>
              </div>
              <div className="radio-block">
                <input type="radio" id="test3" name="radio-group" defaultChecked />
                <label htmlFor="test3" className="mr-0">Custom Booking</label>
              </div>
            </div>
          </div>
          <div className="form-group custom-radio">
            <label>Select Catagory</label>
            <div className="d-flex align-content-center justify-content-start">
              <div className="radio-block">
                <input type="radio" id="test4" name="radio-group" defaultChecked />
                <label htmlFor="test4" className="mr-0">Lunch</label>
              </div>
              <div className="radio-block">
                <input type="radio" id="test5" name="radio-group" />
                <label htmlFor="test5" className="mr-0">Dinner</label>
              </div>
            </div>
          </div>
          <div className="form-group mb-30">
            <label className="custom-checkbox mb-0"><span className="checkbox__title">Weekend</span>
              <input className="checkbox__input" type="checkbox" /><span className="checkbox__checkmark"></span>
            </label>
          </div>
          <div className="form-group">
            <label>Select Date (s)</label>
            <div className="input-group date-picker-input">
              <input type="text" className="form-control border-right-0" placeholder="Select Date" id="demoDate" />
              <div className="input-group-append bg-transparent">
                <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Select Account</label>
            <div className="search-wrapper">
              <input type="text" className="form-control" placeholder="Search Department.." />
              <i className="icon-search search-icon"></i>
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea className="form-control" rows="4" placeholder="Type here.."></textarea>
          </div>
          <div className="form-group">
            <label>Booking Count</label>
            <input type="text" className="form-control" placeholder="100" />
          </div>
          <div className="form-group">
            <label>Select Department</label>
            <div className="search-wrapper">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search Department.." 
                
              />
              <i className="icon-search search-icon"></i>
            </div>
          </div>
          <div className="form-group">
            <label>Select Employees</label>
          </div>
          <div className="table-responsive">
            <table className="table table-hover responsive nowrap table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="form-group mb-0">
                      <label className="custom-checkbox">
                        <input className="checkbox__input" type="checkbox" /><span className="checkbox__checkmark"></span>
                      </label>
                    </div>
                  </th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {users.map( (user) => (
                <tr>
                  <td>
                    <div className="form-group mb-0">
                      <label className="custom-checkbox m-0">
                        <input className="checkbox__input" type="checkbox" /><span className="checkbox__checkmark"></span>
                      </label>
                    </div>
                  </td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-primary">Cancel</button>
          <button type="button" className="btn btn-primary">Book</button>
        </div>
      </div>
    </div>
    </div>
    );
  };

  export default AddBooking;