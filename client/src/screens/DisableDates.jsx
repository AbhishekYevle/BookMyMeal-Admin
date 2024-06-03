import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import AddDisabledDate from "../component/AddDisableDate";
import ChangePasswordModal from "../component/ChangePasswordModal";
import Footer from "../component/Footer";

const Content = () => {
    const [disabledDates, setDisabledDates] = useState([]);

    useEffect(() => {
        const fetchDisabledDates = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/disableddates',   { headers: { Authorization: token } });
            setDisabledDates(response.data);
          } catch (error) {
            console.error('Error fetching disabled dates', error);
          }
        };
    
        fetchDisabledDates();
      }, []);
    
    return(
    <>
      <div className="container-fluid">
        <div className="container pt-30 mb-30">
          <div className="container-head">
            <div className="container-left">
              <h3 className="container-title">Diasbled Dates List</h3>
            </div>
            <div className="container-right">
              <a
                href="#"
                aria-label="Add Booking"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addBookingModal"
              >
                Diasble Date
              </a>
            </div>
          </div>
          {/* <div className="content-tab">
            <a className="content-tab_link active" href="#">
              Dates
            </a>
          </div> */}
          <table className="table">
          <thead>
            <tr>
              <th>Date(s)</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {disabledDates.map((date) => (
                <tr key={date._id}>
                <td>
                  {date.dates.map((date, index) => (
                    <span key={index}>{new Date(date).toLocaleDateString('en-IN')}, </span>
                  ))}
                </td>
                  <td>{date.reason}</td>
                </tr>
              ))}
              {/* {users.map((user) => (
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
            ))} */}
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