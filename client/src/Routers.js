import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import signIn from './screens/signIn';
import forgotPassword from './screens/forgotPassword';
import bookingList from './screens/bookingList';
import userList from './screens/userList';
import Admin from './screens/Admin';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={signIn} />
        <Route path="/forgotpassword" Component={forgotPassword} />
        <Route path="/bookinglist" Component={bookingList} />
        <Route path="/userlist" Component={userList} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </Router>
  );
}

export default Routers;
