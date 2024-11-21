import React from 'react';

function AvailabilityList({ availability }) {
  return (
    <ul>
      {availability.map((slot) => (
        <li key={slot.id}>
          {slot.startTime} - {slot.endTime}
        </li>
      ))}
    </ul>
  );
}

export default AvailabilityList;
