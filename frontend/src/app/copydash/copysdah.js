import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './sdashboard.css';

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

    return (
        <div>
            <h1 id="gd"><span class="blue"></span>Staff<span class="blue"></span> <span class="yellow">Dashboard</span></h1>
            {/* <h2>Dashboard</h2> */}
            {staffData && (

                
                // <div>
                //     <p>Welcome, {staffData.name}</p>
                //     <p>Your email is {staffData.email}</p>
                //     <p>Your role is {staffData.userType}</p>
                // </div>
                 <div class="card-outer-container">
                 <div class="card-container">
                     <span class="edit-symbol"><i class="fas fa-edit"></i></span>
                     <h2>Welcome, {staffData.name}</h2>
                     <h4 id="em">Your email is {staffData.email}</h4>
                     <p id="emm">Your role is {staffData.userType}</p>
                     {/* <p id="emm">Male, 20 years</p>
                 
                     <div class="imp-data">
                             <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class = "icon-style"><path d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/></svg>
                       Aadhar number {user.aadhar}</p>
                             <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class = "icon-style"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>9876543211</p>
                     </div> */}
                 </div>
                 </div>

            )}

            {/* <h3>Your Bookings</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Place</th>
                            <th>Aadhar</th>
                            <th>Start Slot</th>
                            <th>End Slot</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placeBookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.userId.name}</td>
                                <td>{booking.userId.email}</td>
                                <td>{booking.placeId.name}</td>
                                <td>{booking.userId.aadhar}</td>
                                <td>{new Date(booking.startSlot).toLocaleString()}</td>
                                <td>{new Date(booking.endSlot).toLocaleString()}</td>
                                <td>{booking.phno}</td>
                                <td>{booking.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

<table class="container">
	<thead>
    <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Place</th>
                            <th>Aadhar</th>
                            <th>Start Slot</th>
                            <th>End Slot</th>
                            <th>Phone Number</th>
                            <th id="df">Address</th>
                        </tr>
	</thead>
	<tbody>
		   {placeBookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.userId.name}</td>
                                <td>{booking.userId.email}</td>
                                <td>{booking.placeId.name}</td>
                                <td>{booking.userId.aadhar}</td>
                                <td>{new Date(booking.startSlot).toLocaleString()}</td>
                                <td>{new Date(booking.endSlot).toLocaleString()}</td>
                                <td>{booking.phno}</td>
                                <td>{booking.address}</td>
                            </tr>
                        ))}
	</tbody>
</table>
        </div>
    );
}

export default SDashboard;