import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = () => {
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleDateRangeChange = (dates) => {
    setSelectedRange(dates);
    setIsCalendarOpen(false);
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="form-group">
      <label>Select Date (s)</label>
      <div className="input-group date-picker-input">
        <input
          type="text"
          className="form-control border-right-0"
          placeholder="Select Date"
          id="demoDate"
          value={
            selectedRange[0] && selectedRange[1]
              ? `${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()}`
              : ""
          }
          readOnly
        />
        <div className="input-group-append bg-transparent" onClick={handleCalendarIconClick}>
          <span className="input-group-text bg-transparent" id="basic-addon2">
            <i className="icon-calendar"></i>
          </span>
        </div>
        {isCalendarOpen && (
          <div className="date-picker-container" ref={calendarRef}>
            <DatePicker
              selected={selectedRange}
              onChange={handleDateRangeChange}
              startDate={selectedRange[0]}
              endDate={selectedRange[1]}
              selectsRange
              inline
              minDate={new Date()}
              onClickOutside={handleOutsideClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
