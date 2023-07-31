const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get token from header

			token = req.headers.authorization.split(' ')[1];

			//verify the toke

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			//get user  fomr the token

			req.user = await Student.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not Authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not Authorized, No Token');
	}
});

module.exports = protect;
