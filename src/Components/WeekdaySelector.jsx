import React from 'react';

const WeekdaySelector = ({ activeWeek, onWeekChange }) => {
    const weekdays = ['mon', 'tue', 'wen', 'thur', 'fri', 'sat', 'sun'];
    const weekdayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="chanel-social">
            <h3>가능한 요일</h3>
            <div className="flex justify-between mt-4">
                {weekdays.map((day, index) => (
                    <div
                        key={day}
                        className={`${activeWeek.includes(day) ? "weekend-active" : "weekend"}`}
                        onClick={() => onWeekChange(day)}
                    >
                        {weekdayLabels[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekdaySelector; 