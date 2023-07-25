const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env')
dotenv.config({path:envPath});
const app = express();
const connectDatabase = require("./config/dbconfig");
const PORT = process.env.PORT || 8060;


app.use(cors());
app.use(bodyParser.json());

connectDatabase();

// const studentRouter = require('./routes/students');
const studentRouter = require('./routes/authRoutes');
const { env } = require('process');
app.use('/student', studentRouter);

//servr frontend

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		)
	);
} else {
	app.get('/', (req, res) => res.send('App is not ready yet'));
}

app.listen(PORT, () => {
	console.log('Server is up and running on : ' + PORT);
});
