import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Make sure to import CSS for DatePicker

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPlaces, setShowPlaces] = useState(true);
  const [usrDisplay, setUsrDisplay] = useState(true);
  const [showUsrBooking, setShowUsrBooking] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [phno, setPhno] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:8080/api/protected', {
          method: 'GET',
          credentials: 'include',
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.userData);
          
          const placesResponse = await fetch('http://localhost:8080/api/places', {
            method: 'GET',
            credentials: 'include',
          });
          if (placesResponse.ok) {
            const placesData = await placesResponse.json();
            setPlaces(placesData);
          } else {
            console.error('Error fetching places:', placesResponse.statusText);
          }
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/home');
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/home');
    }
  }, [navigate, token]); // Dependency array ensures this runs only once on component mount

  const handleBooking = (place) => {
    setShowBookingForm(true); // Show the booking form
    setShowPlaces(false);
    setUsrDisplay(false);
    setShowUsrBooking(false);
    setSelectedPlace(place); // Set the selected place
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        placeId: selectedPlace._id,
        phno,
        address,
        startSlot: startDate,
        endSlot: endDate,
      }),
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Booking successful:', data);
      setUserBookings([...userBookings, data]);
      setShowBookingForm(false);
      setShowPlaces(true); // Hide the booking form after successful booking
      setShowUsrBooking(true);
    } else {
      console.error('Error booking:', data);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;
    try {
      const userBookingsResponse = await fetch(`http://localhost:8080/api/bookings/user/${user._id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (userBookingsResponse.ok) {
        const userBookingsData = await userBookingsResponse.json();
        setUserBookings(userBookingsData);
      } else {
        console.error('Error fetching user bookings:', userBookingsResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      
      {usrDisplay && user && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email is {user.email}</p>
          <p>Your Aadhar number is {user.aadhar}</p>
        </div>
      )}
      <h3>Available Places</h3>
      <ul>
        {showPlaces && places.map(place => (
          <li key={place._id}>
            <div>
              <h4>{place.name}</h4>
              <p>Location: {place.location}</p>
              <p>Contact: {place.contact}</p>
              <img src={place.Image} alt={place.name} />
              <p>Slots: {place.slot}</p>
              <button onClick={() => handleBooking(place)}>Book Now</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={fetchUserBookings}>Check My Bookings</button>
      {showBookingForm && (
        <div>
          <h3>Booking Form</h3>
          <form onSubmit={submitBooking}>
          <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Select start date"
        /><br/>
        <DatePicker 
          selected={endDate} 
          onChange={(date) => setEndDate(date)} 
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Select end date"
        /><br/>
        <input 
          type="number" 
          placeholder="Phone Number" 
          value={phno} 
          onChange={(e) => setPhno(e.target.value)} 
          required
        /><br/>
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
      )}
      <h3>Your Bookings</h3>
      <ul>
        {showUsrBooking && userBookings && userBookings.map(booking => (
          <li key={booking._id}>
            <div>
              <p>Place: {booking.placeId.name}</p>
              <p>Start Slot: {new Date(booking.startSlot).toLocaleString()}</p>
              <p>End Slot: {new Date(booking.endSlot).toLocaleString()}</p>
              <p>Phone Number: {booking.phno}</p>
              <p>Address: {booking.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;