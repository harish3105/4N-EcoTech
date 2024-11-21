import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 

function Dashboard() {
  const [availability, setAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAvailability, setNewAvailability] = useState({ startTime: '', endTime: '' });

  const userId = 1; // Replace with dynamic user ID from authentication

  useEffect(() => {
    fetchAvailability();
    fetchAppointments();
  }, []);

  const fetchAvailability = async () => {
    const response = await fetch(`https://fourn-ecotech-assignment-backend.onrender.com/api/availability/${userId}`);
    const data = await response.json();
    setAvailability(data);
  };

  const fetchAppointments = async () => {
    const response = await fetch(`https://fourn-ecotech-assignment-backend.onrender.com/api/appointments/${userId}`);
    const data = await response.json();
    setAppointments(data);
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    await fetch('https://fourn-ecotech-assignment-backend.onrender.com/api/availability/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...newAvailability }),
    });
    fetchAvailability();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Your Availability</h3>
        <form onSubmit={handleAvailabilitySubmit}>
          <input
            type="datetime-local"
            name="startTime"
            onChange={(e) => setNewAvailability({ ...newAvailability, startTime: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            name="endTime"
            onChange={(e) => setNewAvailability({ ...newAvailability, endTime: e.target.value })}
            required
          />
          <button type="submit">Set Availability</button>
        </form>
        <ul>
          {availability.map((slot) => (
            <li key={slot.id}>
              {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Your Appointments</h3>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>{appointment.scheduledTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
