import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SDashboard = ({ token }) => {
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState(null);
    const [placeBookings, setPlaceBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('http://localhost:8080/api/protected', {
                    method: 'GET',
                    credentials: 'include', // Include credentials to send cookies
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setStaffData(userData.userData);

                    // Fetch bookings associated with the staff's assigned place
                    const staffBookingsResponse = await fetch(`http://localhost:8080/api/bookings/place/${userData.userData._id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (staffBookingsResponse.ok) {
                        const bookingsData = await staffBookingsResponse.json();
                        setPlaceBookings(bookingsData);
                        // console.log(placeBookings)
                        
                    
                    } else {
                        console.error('Error fetching staff bookings:', staffBookingsResponse.statusText);
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
    }, [navigate, token]);
    // console.log(placeBookings.placeId.name)
    return (
        <div>
            <h2>Dashboard</h2>
            {staffData && (
                <div>
                    <p>Welcome, {staffData.name}</p>
                    <p>Your email is {staffData.email}</p>
                    <p>Your role is {staffData.userType}</p>
                </div>
            )}

            <h3>Your Bookings</h3>
            <ul>
                {placeBookings && placeBookings.map(booking => (
                    <li key={booking._id}>
                        <div>
                            <p>User Name: {booking.userId.name}</p>
                            <p>User Email: {booking.userId.email}</p>
                            <p>Place Name: {booking.placeId.name}</p>
                            
                            <p>User Aadhar: {booking.userId.aadhar}</p>
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
}

export default SDashboard;