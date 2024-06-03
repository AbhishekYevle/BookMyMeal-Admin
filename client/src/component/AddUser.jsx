import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const server = process.env.SERVER_API;
// const client = process.env.CLIENT_API;

const AddUser = () => {
  // const [passwordShown, setPasswordShown] = useState(false);
  const [data, setData] = useState({ username: "", email: "", phone: "", department: "", gender: "", password: "" });
  // const [selectedGender, setSelectedGender] = useState(data.gender);
  // const [error, setError] = useState("");
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/userlist`,   { headers: { Authorization: token } })
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  
  // const radioChange = (event) => {
  //   setSelectedGender(event.target.value);
  // };
  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!data.username || !data.email || !data.phone || !data.department || !data.gender || !data.password) {
    //   setError("Please fill in all fields.");
    //   toast.error("Please fill al the data");
    //   return;
    // }

    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:5000/api/addemployee`;
      const response = await axios.post(url, data, { headers: { Authorization: token } });
      console.log(response.data.msg, response.data.isError); 
      // toast.success("Employee Created Successfully.");

      if (response.data.isError === false) {
        // localStorage.setItem('isAuthenticated', 'true');
        // navigate('/bookinglist');
        document.getElementById('closeButton').click();
        alert("Employee Created Successfully.");
        window.location.reload();
        // toast.success("Employee Created Successfully.");
        // setData({ username: "", email: "", phone: "", department: "", gender: "", password: "" });
    } else {
      alert('Invalid email or password');
      toast.error('Invalid email or password');
    }

      // window.location.href = `${client}/userlist`;
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        alert(error.response.data.msg);
        // setError(error.response.data.msg);
      }
    }
  };


    return (
      <div className="modal fade side-modal" id="addBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Create Admin</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeButton" >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group custom-radio">
          <div className="form-group">
              <label className="control-label">First Name</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Abhishek"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  autoFocus
                  required
                />
                {/* <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Last Name</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Yevle"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  autoFocus
                  required
                />
                {/* <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Email</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  placeholder="bookmymeal@rishabhsoft.com"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  autoFocus
                  required
                />
                {/* <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Phone No.</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={data.phone}
                  autoFocus
                  required
                />
                {/* <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Department</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  onChange={handleChange}
                  value={data.department}
                  autoFocus
                  required
                />
                {/* <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div> */}
              </div>
            </div>
            {/* <div className="form-group">
              <label className="control-label">Password</label>
              <div className="input-addon">
                <input
                  id="password-field"
                  className="form-control"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                //   value="password"
                />
                <span
                  toggle="#password-field"
                  className={`icon-eye-close field-icon toggle-password ${
                    passwordShown ? "icon-eye-open" : ""
                  }`}
                  onClick={togglePassword}
                ></span>
              </div>
            </div> */}
          </div>
          <div className="form-group custom-radio">
            <label>Gender</label>
            <div className="d-flex align-content-center justify-content-start">
              <div className="radio-block">
                <input 
                  type="radio" 
                  id="test4"
                  value="male" 
                  name="gender"
                  onChange={handleChange} 
                  defaultChecked 
                  checked={data.gender === "male"}
                  />
                <label htmlFor="test4" className="mr-0">Male</label>
              </div>
              <div className="radio-block">
                <input 
                  type="radio" 
                  id="test5" 
                  value="female" 
                  name="gender" 
                  onChange={handleChange}
                  checked={data.gender === "female"}
                />
                <label htmlFor="test5" className="mr-0">female</label>
              </div>
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
                  <th>ID</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Phone No.</th>
                  <th>Gender</th>
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
                  <td>{user.empId}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                </tr>
                ))}
              </tbody>
            </table>
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

  export default AddUser;