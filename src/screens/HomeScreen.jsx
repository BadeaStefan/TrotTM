import { useState, useEffect } from 'react';
import Room from '../components/Room';
import Loader from '../components/Loader.jsx';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
export default function HomeScreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [type, setType] = useState('all');

    const { RangePicker } = DatePicker;

    useEffect(() => {
        async function fetchRooms() {
            try {
                //setLoading(true);
                const data = await fetch('http://localhost:3000/api/rooms/getallrooms');
                const roomsData = await data.json();

                setRooms(roomsData);
                setDuplicateRooms(roomsData);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                //setLoading(false);
            }
        }
        fetchRooms();

    }, [])

    function filterByDate(dates) {
        setFromDate(moment(dates[0].$d).format('DD-MM-YYYY'));
        setToDate(moment(dates[1].$d).format('DD-MM-YYYY'));

        var tempRooms = [];
        var availability = false;

        for (const room of duplicateRooms) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    if (!moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                        && !moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                    ) {
                        if (moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            availability = true;
                        }
                    }
                }
            }
            if (availability == true || room.currentbookings.length == 0) {
                tempRooms.push(room);
            }
            setRooms(tempRooms);
        }
    }

    function filterBySearch() {
        const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase));

        setRooms(tempRooms);
    }

    function filterByType(e) {
        setType(e);

        if (e !== 'all') {
            const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() == e.toLowerCase());

            setRooms(tempRooms);
        } else {
            setRooms(duplicateRooms);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 bs">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate}></RangePicker>
                </div>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="search rooms" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch}></input>
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={type} onChange={(e) => { filterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (<Loader></Loader>) : error ? (<h1>Error</h1>) : (rooms.map(room => {
                    return <Room key={room.name} room={room} fromdate={fromDate} todate={toDate}></Room>
                }))}
            </div>
        </div>
    );
}