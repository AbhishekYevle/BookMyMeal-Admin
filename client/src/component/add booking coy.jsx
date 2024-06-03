import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddBooking = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [category, setCategory] = useState("employee");
  const [mealType, setMealType] = useState("lunch");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState(null);
  const [bookingCount, setBookingCount] = useState(null);
  const [bookingName, setBookingName] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [accountSearch, setAccountSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [empIdSearch, setEmpIdSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/userlist`)
      .then((response) => {
        const usersWithCheck = response.data.map((user) => ({ ...user, isChecked: false }));
        setUsers(usersWithCheck);
        setFilteredUsers(usersWithCheck);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterUsers();
  }, [accountSearch, departmentSearch, empIdSearch, users]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleBookingCountChange = (e) => {
    setBookingCount(e.target.value);
  };

  const handleBookingNameChange = (e) => {
    setBookingName(e.target.value);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCheckboxChange = (userId) => {
    setUsers(users.map(user =>
      user._id === userId ? { ...user, isChecked: !user.isChecked } : user
    ));
  };

  const handleSearchChange = (e) => {
    setAccountSearch(e.target.value);
  };

  const handleDepartmentSearchChange = (e) => {
    setDepartmentSearch(e.target.value);
  };

  const handleEmpIdSearchChange = (e) => {
    setEmpIdSearch(e.target.value);
  };

  const getDatesInRange = (start, end) => {
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const filterUsers = () => {
    const lowerAccountSearch = accountSearch.toLowerCase();
    const lowerDepartmentSearch = departmentSearch.toLowerCase();
    const lowerEmpIdSearch = empIdSearch.toLowerCase();

    const newFilteredUsers = users.filter(user => 
      (user.username?.toLowerCase().includes(lowerAccountSearch) || 
       user.firstName?.toLowerCase().includes(lowerAccountSearch) || 
       user.lastName?.toLowerCase().includes(lowerAccountSearch)) &&
      user.department?.toLowerCase().includes(lowerDepartmentSearch) &&
      user.empId?.toLowerCase().includes(lowerEmpIdSearch)
    );

    setFilteredUsers(newFilteredUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedUsers = users.filter(user => user.isChecked);
    const selectedUserData = selectedUsers.map(user => ({
      empId: user.empId,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department
    }));

    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
    const dateArray = startDate && endDate ? getDatesInRange(startDate, endDate).map(date => date.toISOString().split('T')[0]) : [];

   const bookingData = {
    category,
    mealType,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    dates: dateArray,
    employees: selectedUserData, 
    notes,
    bookingCount,
    bookingName
  };

    console.log(bookingData);

    try {
      const response = await axios.post('http://localhost:5000/api/addbooking', bookingData);
      document.getElementById('closeButton').click();
      alert(response.data.msg);
      window.location.reload();
      toast.success('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    }
  };

  // Function to filter out Saturdays and Sundays
  const isWeekday = date => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="modal fade side-modal" id="addBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Book a Meal</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeButton">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group custom-radio">
              <label>Select Category</label>
              <div className="d-flex align-content-center justify-content-start">
                <div className="radio-block">
                  <input type="radio" id="employee" name="category" value="employee" checked={category === "employee"} onChange={handleCategoryChange} />
                  <label htmlFor="employee" className="mr-0">Employees</label>
                </div>
                <div className="radio-block">
                  <input type="radio" id="nonEmployee" name="category" value="nonEmployee" checked={category === "nonEmployee"} onChange={handleCategoryChange} />
                  <label htmlFor="nonEmployee" className="mr-0">Non Employees</label>
                </div>
                <div className="radio-block">
                  <input type="radio" id="customBooking" name="category" value="customBooking" checked={category === "customBooking"} onChange={handleCategoryChange} />
                  <label htmlFor="customBooking" className="mr-0">Custom Booking</label>
                </div>
              </div>
            </div>
            <div className="form-group custom-radio">
              <label>Select Meal</label>
              <div className="d-flex align-content-center justify-content-start">
                <div className="radio-block">
                  <input type="radio" id="lunch" name="mealType" value="lunch" checked={mealType === "lunch"} onChange={handleMealTypeChange} />
                  <label htmlFor="lunch" className="mr-0">Lunch</label>
                </div>
                <div className="radio-block">
                  <input type="radio" id="dinner" name="mealType" value="dinner" checked={mealType === "dinner"} onChange={handleMealTypeChange} />
                  <label htmlFor="dinner" className="mr-0">Dinner</label>
                </div>
              </div>
            </div>
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
                  filterDate={isWeekday}
                  minDate={new Date()}
                />
              )}
            </div>
            {category !== "nonEmployee" && category !== "customBooking" && (
              <>
                <div className="form-group">
                  <label>Select Department</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Select Department" 
                    value={departmentSearch} 
                    onChange={handleDepartmentSearchChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Select Employee ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Select Employee ID" 
                    value={empIdSearch} 
                    onChange={handleEmpIdSearchChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Select Account</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Select Account" 
                    value={accountSearch} 
                    onChange={handleSearchChange} 
                  />
                </div>
              </>
            )}
            {category === "employee" && (
              <div className="form-group table-responsive">
                <label>Select Employees</label>
                <table className="table table-hover responsive nowrap table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-group mb-0">
                          <label className="custom-checkbox">
                            <input 
                              className="checkbox__input" 
                              type="checkbox" 
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setUsers(users.map(user => ({ ...user, isChecked: checked })));
                              }} 
                            />
                            <span className="checkbox__checkmark"></span>
                          </label>
                        </div>
                      </th>
                      <th>Employee ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="form-group mb-0">
                            <label className="custom-checkbox m-0">
                              <input
                                className="checkbox__input"
                                type="checkbox"
                                checked={user.isChecked}
                                onChange={() => handleCheckboxChange(user._id)}
                              />
                              <span className="checkbox__checkmark"></span>
                            </label>
                          </div>
                        </td>
                        <td>{user.empId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {category === "nonEmployee" && (
              <div className="form-group">
                <label>Notes</label>
                <textarea className="form-control" rows="4" placeholder="Type here.." onChange={handleNotesChange}></textarea>
              </div>
            )}
            {category === "customBooking" && (
              <>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea className="form-control" rows="4" placeholder="Type here.." onChange={handleNotesChange}></textarea>
                </div>
                <div className="form-group">
                  <label>Booking Count</label>
                  <input type="text" className="form-control" placeholder="100" onChange={handleBookingCountChange} />
                </div>
                <div className="form-group">
                  <label>Booking Name</label>
                  <input type="text" className="form-control" placeholder="Enter booking name" onChange={handleBookingNameChange}/>
                </div>
              </>
            )}
            {category === "nonEmployee" && (
              <div className="form-group">
                <label>Booking Count</label>
                <input type="text" className="form-control" placeholder="100" onChange={handleBookingCountChange}/>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
