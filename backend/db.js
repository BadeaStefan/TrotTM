import mongoose from "mongoose";

const mongoURL = process.env.DB_KEY;

mongoose.connect(mongoURL);
//mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => {
	console.log('Mongo DB connection failed');
})

connection.on('connected', () => {
	console.log('Mongo DB connection succesful');
})

export default mongoose;