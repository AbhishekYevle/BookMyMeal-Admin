import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import logo_white from '../images/logo-white.svg';
import Navbar from '../component/Navbar';
import AddAdmin from "../component/AddAdmin";
import ChangePassword from "../component/ChangePassword";
import Footer from "../component/Footer";
// const server = process.env.SERVER_API;

const Content = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/userlist`)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div className="container-fluid">
        <div className="container pt-30 mb-30">
          <div className="container-head">
            <div className="container-left">
              <h3 className="container-title">Admin List</h3>
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
              Rishabh Admins
            </a>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone No.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.phone}</td>
                <td><a href="#" className="delete-link" aria-label="Delete">
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
    <ChangePassword />  
    <AddAdmin />  
    </div>
  );
};

export default UserList;