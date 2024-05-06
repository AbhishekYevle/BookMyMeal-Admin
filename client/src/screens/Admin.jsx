import React, { useState, useEffect } from "react";
import axios from "axios";
// const server = process.env.SERVER_API;

const Admin = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/userlist`)
            .then(response => setAdmins(response.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr>
                        {/* key={admin.id} */}
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;