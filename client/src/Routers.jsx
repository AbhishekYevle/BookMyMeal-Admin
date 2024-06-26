import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import signIn from './screens/signIn';
import forgotPassword from './screens/forgotPassword';
import Calendar from './screens/Calendar';
import BookingList from './screens/BookingList';
import userList from './screens/userList';
import Admin from './screens/Admin';
import ResetPassword from './screens/ResetPassword';
import PrivateRoute from './PrivateRoute';
import DisableDates from './screens/DisableDates';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={signIn} />
        <Route path="/forgotpassword" Component={forgotPassword} />
        <Route path="/resetpassword" Component={ResetPassword} />
        <Route element={<PrivateRoute />}>
          <Route path="/calendar" Component={Calendar} />
          <Route path="/bookinglist" Component={BookingList} />
          <Route path="/userlist" Component={userList} />
          <Route path="/admin" Component={Admin} />
          <Route path="/disabledate" Component={DisableDates} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routers;

// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import signIn from './screens/signIn';
// import forgotPassword from './screens/forgotPassword';
// import bookingList from './screens/bookingList';
// import userList from './screens/userList';
// import Admin from './screens/Admin';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" exact Component={signIn} />
//         <Route path="/forgotpassword" Component={forgotPassword} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/bookinglist" element={bookingList} />
//           <Route path="/userlist" element={userList} />
//           <Route path="/admin" element={Admin} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

