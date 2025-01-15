import express from "express";
import bookingModel from '../models/booking.js';
import roomModel from '../models/room.js';
import moment from 'moment';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe('sk_test_51Q04Wl03ZF7QUX85KM7xspYQEkc4pw5nvzhVKb6SxN2tRbD5FmYtq12d26zEANNZqM6PcYlIBoS1mp95UMVqvp0z00E09NjPvb');

const router = express.Router();

router.post("/bookroom", async (req, res) => {

    const { room,
        userid,
        fd,
        td,
        totalAmount,
        totalDays,
        token } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create(
            {
                amount: totalAmount,
                customer: customer.id,
                currency: 'USD',
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        )
        if (payment) {
           
                const newBooking = new bookingModel({
                    room: room.name,
                    roomid: room._id,
                    userid: userid,
                    fromdate: moment(fd).format('DD-MM-YYYY'),
                    todate: moment(td).format('DD-MM-YYYY'),
                    totalamount: totalAmount,
                    totaldays: totalDays,
                    transactionid: '1234',
                });

                const booking = await newBooking.save();
                const roomTemp = await roomModel.findOne({ _id: room._id });
                roomTemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fd).format('DD-MM-YYYY'), todate: moment(td).format('DD-MM-YYYY'), userid: userid, status: booking.status });

                await roomTemp.save();

                

            
        }

        res.json('Payment succesfully, your room is booked');

    } catch (error) {
        return res.status(400).json({ error});
    }


    
});

router.post("/getbookingsbyuserid", async (req, res) => {
    const user = req.body;
    const userid = user._id;
    
    try {
        const bookings = await bookingModel.find({ userid: userid });
        res.json(bookings);
        
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/cancelbooking", async (req, res) => {
    const { bookingid, roomid } = req.body;
    
    try {
        const bookingItem = await bookingModel.findOne({ _id: bookingid })
        bookingItem.status = "canceled";
        await bookingItem.save();
        const room = await roomModel.findOne({ _id: roomid });
        const bookings = room.currentbookings;
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid);
        room.currentbookings = temp;

        res.json('Your booking canceled succesfully');

        await room.save();

    } catch (error) {
        return res.status(400).json({ error });
    }

})

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        res.json(bookings);
    } catch (error) {
        return res.status(400).json({ error });
    }
})


export default router;