import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Schedule.css';

function Schedule() {
  const { userId } = useParams();
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    const response = await fetch(`https://fourn-ecotech-assignment-backend.onrender.com/api/availability/${userId}`);
    const data = await response.json();
    setAvailability(data);
  };

  const handleSchedule = async () => {
    await fetch('https://fourn-ecotech-assignment-backend.onrender.com/api/appointments/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, scheduledTime: selectedSlot }),
    });
    alert('Appointment scheduled!');
  };

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      <ul>
        {availability.map((slot) => (
          <li key={slot.id}>
            {slot.startTime} - {slot.endTime}
            <button onClick={() => setSelectedSlot(slot.startTime)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSchedule} disabled={!selectedSlot}>
        Confirm Appointment
      </button>
    </div>
  );
}

export default Schedule;
