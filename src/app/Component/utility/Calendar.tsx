import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isCurrentDate = 
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          data-date={date.toDateString()}
          className={isCurrentDate ? "current-date" : ""}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button 
          type="button" 
          className="calendar__arrow left"
          onClick={handlePrevMonth}
        >
          <i className="ph ph-caret-left"></i>
        </button>
        <p className="display h6 mb-0">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <button 
          type="button" 
          className="calendar__arrow right"
          onClick={handleNextMonth}
        >
          <i className="ph ph-caret-right"></i>
        </button>
      </div>

      <div className="calendar__week week">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar__week-text">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar; 
