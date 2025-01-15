import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from './db.js';
import router from './routes/roomRoute.js';
import userRouter from './routes/usersRoute.js';
import bookingsRouter from './routes/bookingsRoute.js';

const app = express();

const dbConfig = mongoose;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//app.use(express.json);
app.use('/api/rooms', router);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingsRouter);

const port = 3000;

app.listen(port, () => console.log(`Server us running at ${port}`));



