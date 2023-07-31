const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const sendEmail = require('../util/sendEmail');
const registerMail = require('../util/registerMail');
const approveMail = require('../util/approveMail');
const Project = require('../models/Project');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const {
		email,
		name,
		password,
		regNo,
		role,
		userStatus,
		contactNumber,
		profilePic,
		applyDate,
		gender,
	} = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}
	if (!name || !email || !password || !regNo) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	//check if user exits
	const userExists = await Student.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await Student.create({
		email,
		name,
		role,
		password: hashedPassword,
		regNo,
		userStatus,
		contactNumber,
		profilePic,
		applyDate,
		gender,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			date: user.applyDate,
			token: generateToken(user._id),
		});
		await sendEmail(
			's17391@sci.pdn.ac.lk',
			'New user request',
			`New user request from ${name}`
		);
		await sendEmail(email, 'Welcome to CSUP Member portal', registerMail);
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const { email, password } = req.body;

	// Check for user email
	const user = await Student.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			profilePic: user.profilePic,
			role: user.role,
			token: generateToken(user._id),
			applyDate: user.applyDate,
			confirmDate: user.confirmDate,
			firstName: user.firstName,
			lastName: user.lastName,
			contactNumber: user.contactNumber,
			regNo: user.regNo,
			gender: user.gender,
			userStatus: user.userStatus,
			birthDate: user.birthDate,
			facebook: user.facebook,
			twitter: user.twitter,
			linkdin: user.linkdin,
			instagram: user.instagram,
			github: user.github,
			cv: user.cv,
			approvedBy: user.approvedBy,
			headline: user.headline,
			about: user.about,
			website: user.website,
			skills: user.skills,
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

//show all users
const getAll = asyncHandler(async (req, res) => {
	Student.find()
		.then((students) => {
			res.json(students);
		})
		.catch((err) => {
			console.log(err);
		});
});
const getUserById = asyncHandler(async (req, res) => {
	let userId = req.params.id;
	const user = await Student.findById(userId);

	res.status(200).json(user);
	// .then(() => {
	// 	res.status(200).send({
	// 		message: 'User fetched Successfully',
	// 	});
	// })
	// .catch((err) => {
	// 	console.log(err);
	// 	res
	// 		.status(500)
	// 		.send({ status: 'Error with get user', error: err.message });
	// });
});
//update user

const updateUser = asyncHandler(async (req, res) => {
	let userId = req.params.id;

	const {
		email,
		role,
		password,
		name,
		profilePic,
		applyDate,
		confirmDate,
		firstName,
		lastName,
		contactNumber,
		regNo,
		gender,
		userStatus,
		birthDate,
		facebook,
		twitter,
		linkdin,
		instagram,
		github,
		cv,
		approvedBy,
		headline,
		about,
		website,
		skills,
	} = req.body;

	const updateStudent = {
		email,
		role,
		password,
		name,
		profilePic,
		applyDate,
		confirmDate,
		firstName,
		lastName,
		contactNumber,
		regNo,
		gender,
		userStatus,
		birthDate,
		facebook,
		twitter,
		linkdin,
		instagram,
		github,
		cv,
		approvedBy,
		headline,
		about,
		website,
		skills,
	};

	await Student.findByIdAndUpdate(userId, updateStudent)
		.then(() => {
			res.status(200).send({ status: 'User updated', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with updating data', error: err.message });
		});
});

//approve user
const approveUser = asyncHandler(async (req, res) => {
	let userId = req.params.id;

	const { name, email, applyDate, confirmDate, userStatus, approvedBy } =
		req.body;

	const updateStudent = {
		name,
		email,
		applyDate,
		confirmDate,
		userStatus,
		approvedBy,
	};
	await sendEmail(email, 'Verification completed', approveMail);

	await Student.findByIdAndUpdate(userId, updateStudent)
		.then(() => {
			res.status(200).send({ status: 'User updated', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with updating data', error: err.message });
		});
});

//change role
const updateRole = asyncHandler(async (req, res) => {
	let userId = req.params.id;

	const { role, confirmDate, approvedBy } = req.body;

	const updateStudent = {
		role,
		confirmDate,
		approvedBy,
	};
	// await sendEmail(email, 'Verification completed', approveMail);

	await Student.findByIdAndUpdate(userId, updateStudent)
		.then(() => {
			res.status(200).send({ status: 'User updated', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with updating data', error: err.message });
		});
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
	let user_Id = req.params.id;
	const user = await Student.findOne({ user_Id });
	await Student.findByIdAndDelete(user_Id)
		.then(() => {
			res.status(200).send({ status: 'User Deleted', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with deleting data', error: err.message });
		});

	await Project.deleteMany({ userId: user_Id })
		.then(() => {
			res.status(200).send({ status: 'Projects Deleted', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with deleting data', error: err.message });
		});
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getUser,
	getAll,
	updateUser,
	deleteUser,
	getUserById,
	approveUser,
	updateRole,
};
