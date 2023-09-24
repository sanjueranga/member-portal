const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.', '.env')
dotenv.config({path:envPath});


const app = express();
const PORT = process.env.PORT || 8060;

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB connection success');
});



// const studentRouter = require('./routes/students');
const studentRouter = require('./routes/authRoutes');
app.use('/student', studentRouter);

//servr frontend

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '../frontend/build')));

// 	app.get('*', (req, res) =>
// 		res.sendFile(
// 			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
// 		)
// 	);
// } else {
// 	app.get('/', (req, res) => res.send('App is not ready yet'));
// }

app.listen(PORT, () => {
	console.log('Server is up and running on : ' + PORT);
});
