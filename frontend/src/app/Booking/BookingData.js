import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';

const BookingData = () => {
  const location = useLocation();
  const { place, user } = location.state;
//   console.log('Place:', place);
//     console.log('User:', user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [phno, setPhno] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          placeId: place._id,
          phno,
          address,
          startSlot: startDate,
          endSlot: endDate,
        }),
      });

      if (response.ok) {
        // Handle successful booking
        console.log('Booking successful');
      } else {
        const errorData = await response.json();
        console.error('Error booking slot:', errorData.message);
      }
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div>
      <h2>Booking Data</h2>
      <h3>Place: {place.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>Name: {user.name}</label><br />
        <label>Email: {user.email}</label><br />
        <label>Aadhar Number: {user.aadhar}</label><br />
        <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Select start date"
        />
        <DatePicker 
          selected={endDate} 
          onChange={(date) => setEndDate(date)} 
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Select end date"
        />
        <input 
          type="number" 
          placeholder="Phone Number" 
          value={phno} 
          onChange={(e) => setPhno(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingData;
