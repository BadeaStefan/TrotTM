import { Tabs } from 'antd';
import { useEffect, useState } from 'react';

export default function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(()=> {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);
    
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <div>
                <h1>My profile</h1>

                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h1>isAdmin: {user.isAdmin ? "Yes": "No"}</h1>
            </div>
        },
        {
            key: '2',
            label: 'Bookings',
            children: <MyBookings></MyBookings>,
        },
    ];

    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setbookings] = useState([]);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch("http://localhost:3000/api/bookings/getbookingsbyuserid", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                });
                const roomsData = await response.json();
                setbookings(roomsData);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    },[user])

    async function cancelBooking(bookingid, roomid) {
        const bookingInfo = { bookingid, roomid };
        try {
            const response = await fetch("http://localhost:3000/api/bookings/cancelbooking", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingInfo)
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {bookings && (bookings.map(booking => {
                        return (<div className="bs" key={booking._id}>
                            <h1>{booking.room}</h1>
                            <p><b>Booking id</b>: {booking._id}</p>
                            <p><b>Check in date</b>: {booking.fromdate}</p>
                            <p><b>Check out date</b>: {booking.todate}</p>
                            <p><b>Amount</b>: {booking.totalamount}</p>
                            <p><b>Status</b>: {booking.status === "booked" ? 'CONFIRMED' : "CANCELED"}</p>
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={() => {cancelBooking(booking._id, booking.roomid)} }>Cancel booking</button>
                            </div>
                        </div>);

                    }))}
                </div>
            </div>
        </div>
    );
} 