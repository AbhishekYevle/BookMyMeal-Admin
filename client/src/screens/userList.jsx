import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import AddUser from "../component/AddUser";
import ChangePasswordModal from "../component/ChangePasswordModal";
import Footer from "../component/Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    axios
      .get(`http://localhost:5000/api/userlist`, { headers: { Authorization: token } })
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    // sessionStorage.removeItem('isAuthenticated');
    toast.success('Logged Out!');
    navigate('/');
  };

  const deleteUser = async (email, empId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:5000/api/deleteemployee`, { email, empId, isDelete: true }, { headers: { Authorization: token } });
      setUsers(users.filter((user) => user.email !== email));
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
      if (error.response.data.error === 'Failed to authenticate token') {
        alert('Failed to authenticate token. Please re-login.');
        handleLogout(); 
      } 
    }
  };

  return (
    <>
    <div className="container-fluid">
        <div className="container pt-30 mb-30">
          <div className="container-head">
            <div className="container-left">
              <h3 className="container-title">Employee List</h3>
            </div>
            <div className="container-right">
              <a
                href="#"
                aria-label="Add Booking"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addBookingModal"
              >
                Add User
              </a>
            </div>
          </div>
          <div className="content-tab">
            <a className="content-tab_link active" href="#">
              Rishabh Employees
            </a>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone No.</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.empId}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>
                  <a
                    href="#"
                    className="delete-link"
                    aria-label="Delete"
                    onClick={() => deleteUser(user.email, user.empId)}
                  >
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

const UserList = () => {
  return (
    <div>
    <Navbar />
    <Content />  
    <Footer />  
    <ChangePasswordModal />  
    <AddUser />  
    </div>
  );
};

export default UserList;