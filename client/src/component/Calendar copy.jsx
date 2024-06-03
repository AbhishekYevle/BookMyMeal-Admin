import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Calendar = ({ onSelectDate, events, setEvents }) => {
  const [todayBookingCount, setTodayBookingCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://43.205.144.105:5000/api/bookinglist');
        const data = await response.data;

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
              category: item.category // Add category to event data
            };
          });
        });

        setTodayBookingCount(count);
        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, [setEvents]);

  const dayPropGetter = (date) => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
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
    const day = moment(event.start).day();
    if (day === 0 || day === 6) {
      if (event.category !== 'customBooking') {
        return { style: { display: 'none' } };
      }
    }
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
        backgroundColor = '#3174ad'; // default color
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
      // for not updating selected date before present date
      return;
    }

    const day = slotInfo.start.getDay();
  if (day === 0 || day === 6) {
    onSelectDate('');
    return;
  }

  onSelectDate(selectedDate);
  };

  return (
    <div className="tile">
      <div>
        <p>Today's Total Bookings: {todayBookingCount}</p>
      </div>
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
