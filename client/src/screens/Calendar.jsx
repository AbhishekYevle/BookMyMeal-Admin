import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Calendar from '../component/Calendar';
import Footer from '../component/Footer';
import BookingSummary from '../component/BookingSummary';
import moment from 'moment';
import ChangePasswordModal from '../component/ChangePasswordModal';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [events, setEvents] = useState([]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="calendar-wrapper">
          <div className="container">
            <h3 className="main-title">Calendar</h3>
            <div className="row">
              <div className="col-lg-9">
                <Calendar onSelectDate={handleSelectDate} events={events} setEvents={setEvents} />
              </div>
              <div className="col-lg-3">
                <BookingSummary selectedDate={selectedDate} events={events} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal />
      <Footer />
    </div>
  );
};

export default CalendarScreen;
