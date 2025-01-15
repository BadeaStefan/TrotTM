import { Tabs } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AdminScreen() {

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("currentUser")).isadmin) {
            window.location.href = "/home";
        }

    },[]);

    const items = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings></Bookings>
        },
        {
            key: '2',
            label: 'Rooms',
            children: <Rooms></Rooms>
        },
        {
            key: '3',
            label: 'Add Room',
            children: <AddRoom></AddRoom>
        },
        {
            key: '4',
            label: 'Users',
            children: <Users></Users>
        },
    ];

    return (
        <div className={"mt-3 ml-3 mr-3 bs"}>
            <h1 className="text-center" style={{ fontSize: '30px' }}>Admin panel</h1>
            <Tabs defaultactivatekey="1" items={items}>

            </Tabs>
        </div>
    );
}

export function Bookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function getBookings() {
            try {
                const response = await fetch("http://localhost:3000/api/bookings/getallbookings");
                const data = await response.json();
                setBookings(data);
            }

            catch (error) {
                console.log(error);
            }
        }
        getBookings();
    })

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Bookings</h1>
                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings && (bookings.map(booking => {
                            return <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

                {bookings && <h1>There are total {bookings.length} bookings</h1>}
            </div>
        </div>
    );
}

export function Rooms() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getRooms() {
            try {
                const response = await fetch("http://localhost:3000/api/rooms/getallrooms");
                const data = await response.json();
                setRooms(data);
            }

            catch (error) {
                console.log(error);
            }
        }
        getRooms();
    })

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Rooms</h1>
                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Mac Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms && (rooms.map(room => {
                            return <tr key={room._id}>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

                {rooms && <h1>There are total {rooms.length} bookings</h1>}
            </div>
        </div>
    );
}

export function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("http://localhost:3000/api/users/getallusers");
                const data = await response.json();
                setUsers(data);
            }

            catch (error) {
                console.log(error);
            }
        }
        getUsers();
    })

    return (
        <div className="row">
            <div className="col-md-13">
                <h1>Users</h1>
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isadmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export function AddRoom() {

    const [name, setName] = useState();
    const [rent, setRent] = useState();
    const [maxCount, setMaxCount] = useState();
    const [description, setDescription] = useState();
    const [phone, setPhone] = useState();
    const [type, setType] = useState();
    const [image, setImage] = useState();

    function addRoom() {
        const newroom = {
            name,
            rent,
            maxCount,
            description,
            phone,
            type,
            image
        }
        console.log(newroom);
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Room name"
                    value={name} onChange={(e) => { setName(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Rent per day"
                    value={rent} onChange={(e) => { setRent(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Max count"
                    value={maxCount} onChange={(e) => { setMaxCount(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Description"
                    value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Phone number"
                    value={phone} onChange={(e) => { setPhone(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Type"
                    value={type} onChange={(e) => { setType(e.target.value) }}></input>
                <input type="text" className="form-control" placeholder="Image URL"
                    value={image} onChange={(e) => { setImage(e.target.value) }}></input>

                <button className="btn btn-primary mt-2" onClick={addRoom}>Add room</button>
            </div>

        </div>
    );
}