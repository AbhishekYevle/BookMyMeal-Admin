import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const Calendar = ({ onSelectDate, events, setEvents }) => {
  const [todayBookingCount, setTodayBookingCount] = useState(0);
  const [disabledDates, setDisabledDates] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    toast.success('Logged Out!');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookinglist', { headers: { Authorization: token } });
        const data = await response.data;
    
        if (response.data.error === 'Failed to authenticate token') {
          alert('Failed to authenticate token. Please re-login.');
          handleLogout(); 
        }
    
        const today = moment().format('YYYY-MM-DD');
        let count = 0;
    
        const mappedEvents = data.flatMap((item) => {
          return item.dates.map((date) => {
            const eventDate = moment(date).format('YYYY-MM-DD');
            if (eventDate === today) {
              count++;
            }
            return {
              title: item.category === 'customBooking'
                ? `${item.bookingName} - ${item.mealType}`
                : `${item.category} - ${item.mealType}`,
              start: new Date(date),
              end: new Date(date),
              allDay: true,
              category: item.category 
            };
          });
        });
    
        const filteredEvents = mappedEvents.filter(event => {
          const eventDate = moment(event.start).format('YYYY-MM-DD');
          return !disabledDates.some(disabledDate => moment(disabledDate).format('YYYY-MM-DD') === eventDate);
        });
    
        setTodayBookingCount(count);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
    
    fetchData();
  }, [setEvents]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/disableddates', { headers: { Authorization: token } });
        setDisabledDates(response.data.map(date => new Date(date.date)));
      } catch (error) {
        console.error('Error fetching disabled dates', error);
        if (error.response && error.response.data && error.response.data.error === 'Failed to authenticate token') {
          alert('Failed to authenticate User. Please re-login.');
          handleLogout(); 
        } else {
          alert('Failed to fetching disabled dates');
        }

      }
    };

    fetchDisabledDates();
  }, []);

  const dayPropGetter = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');

    if (disabledDates.some(disabledDate => moment(disabledDate).format('YYYY-MM-DD') === formattedDate)) {
      return {
        className: 'rbc-day-disabled',
        style: {
          backgroundColor: '#f5f5f5',
          color: '#d3d3d3',
          cursor: 'not-allowed',
        },
      };
    }

    return {};
  };

  const eventPropGetter = (event) => {
    let backgroundColor = '';
    switch (event.category) {
      case 'employee':
        backgroundColor = '#7A58BF';
        break;
      case 'nonEmployee':
        backgroundColor = '#E2553E';
        break;
      case 'customBooking':
        backgroundColor = '#6FCB1F';
        break;
      default:
        backgroundColor = '#3174ad'; 
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      }
    };
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');

    if (selectedDate < today) {
      // not show any data before present date in booking summary
      return;
    }

    if (disabledDates.some(disabledDate => moment(disabledDate).format('YYYY-MM-DD') === selectedDate)) {
      onSelectDate('');
      return;
    }

    onSelectDate(selectedDate);
  };

  return (
    <div className="tile">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        selectable
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default Calendar;