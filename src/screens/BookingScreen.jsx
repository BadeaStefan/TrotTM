/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

export default function BookingScreen() {
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { roomid, fromdate, todate } = useParams();

    const fd = moment(fromdate, 'DD-MM-YYYY');
    const td = moment(todate, 'DD-MM-YYYY');


    const totalDays = moment.duration(td.diff(fd)).asDays();
    const totalAmount = totalDays * room.rentperday;

    useEffect(() => {
        async function fetchRooms() {
            try {
                //setLoading(true);
                const data = await fetch('http://localhost:3000/api/rooms/' + roomid);
                const roomsData = await data.json();

                setRoom(roomsData);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                //setLoading(false);
            }
        }
        fetchRooms();

    }, [roomid]);

   

     async function onToken(token) {
         console.log(token);

         const bookingDetails = {
             room: room,
             userid: JSON.parse(localStorage.getItem('currentUser'))._id,
             fd: fd,
             td: td,
             totalAmount: totalAmount,
             totalDays: totalDays,
             token: token
         }
         try {
             const response = await fetch('http://localhost:3000/api/bookings/bookroom', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(bookingDetails)
             })
             Swal.fire('Congratulations', 'Your room booked succesfully', 'succes').then(response => {
                 window.location.href = '/bookings'
             });
         } catch (error) {
             console.log(error);
             Swal.fire('Oops', 'Something went wrong', 'error');
         }
    }

    return (
        <div className="m-5">
            {loading ? (<Loader></Loader>) : error ? (<h1>Error...</h1>) : (<div>
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-5">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="big-img"></img>
                    </div>
                    <div className="col-md-5">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking details</h1>
                            <hr></hr>

                            <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                            <p>From Date: {fromdate}</p>
                            <p>To Date: {todate}</p>
                            <p>Max Count : {room.maxcount}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Amount</h1>
                            <hr></hr>
                            <p>Total days: {totalDays}</p>
                            <p>Rent per day : {room.rentperday}</p>
                            <p>Total amount {totalAmount}</p>
                        </div>
                        <div style={{ float: 'right' }}>
                            
                            <StripeCheckout
                                amount={totalAmount}
                                token={onToken}
                                stripeKey="pk_test_51Q04Wl03ZF7QUX85tCTuCiNEFEbP55HgzhHKnMLHPiTiONCay4vhqmljzetgO3zTaaV9j9BSPmkaqq1Qy9XEpb8K00Kl6BWALM"
                            >
                                <button className="btn btn-primary">Pay now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
}