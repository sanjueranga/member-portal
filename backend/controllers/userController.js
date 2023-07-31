const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const sendEmail = require('../util/sendEmail');
const registerMail = require('../util/registerMail');
const approveMail = require('../util/approveMail');
const Project = require('../models/Project');
const sendToken = require('../util/jwtToken');

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
		applyDate:Date.now(),
		gender,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			date: user.applyDate,
			
		});
		await sendEmail(
			's17391@sci.pdn.ac.lk',
			'New user request',
			`New user request from ${name}`
		);
		await sendEmail(email, 'Welcome to CSUP Member portal', registerMail);
		
		res.redirect('/login')
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

		sendToken(user, 200, res)
		console.log("login successfull")
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


// const updateUser = asyncHandler(async (req, res) => {
// 	const { id } = req.params;
// 	const updateStudent = req.body;
  
// 	try {
// 	  await Student.findByIdAndUpdate(id, updateStudent);
// 	  res.status(200).send({ status: 'User updated', id });
// 	} catch (err) {
// 	  console.log(err);
// 	  res.status(500).send({ status: 'Error with updating data', error: err.message });
// 	}
//   });

const updateUser = asyncHandler(async (req, res) => {
	let id = req.user.id;
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
 


  //Admin update user

  const updateUserAdmin = asyncHandler(async (req, res) => {
	const id = req.params.id
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
  
	try {
	  // Update the tokenVersion field in the database
	  updateStudent.tokenVersion = (updateStudent.tokenVersion || 0) + 1;
  
	  await Student.findByIdAndUpdate(id, updateStudent);
  
	  // Get the updated user from the database
	  const updatedUser = await Student.findById(id);
  
	  // Generate a new JWT token with the updated tokenVersion
	  const newJwtToken = updatedUser.getJwtToken();
  
	  // Clear the user's cookies by setting the token cookie to null and setting its expiration to a past date
	  res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true
	  });
  
	  res.status(200).send({ status: 'User updated', id, newJwtToken });
	} catch (err) {
	  console.log(err);
	  res.status(500).send({ status: 'Error with updating data', error: err.message });
	}
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
	const userId = req.params.id;
	const { role, confirmDate, approvedBy } = req.body;
  
	const updateStudent = {
	  role,
	  confirmDate,
	  approvedBy,
	};
  
	try {
	  // Update the tokenVersion field in the database
	  updateStudent.tokenVersion = (updateStudent.tokenVersion || 0) + 1;
  
	  await Student.findByIdAndUpdate(userId, updateStudent);
	  const updatedUser = await Student.findById(userId);
	  const newJwtToken = updatedUser.getJwtToken();
	  res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true
	  });
  
	  res.status(200).send({ status: 'User role updated', id: userId, newJwtToken });
	} catch (err) {
	  console.log(err);
	  res.status(500).send({ status: 'Error with updating data', error: err.message });
	}
  });
  

//delete user
const deleteUser = asyncHandler(async (req, res) => {
	let user_Id = req.user.id;
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

//delete user Admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
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
	const data = req.cookies.user ? req.cookies.user : req.user;
	console.log(data);
	res.status(200).json(data);
	
	
});

const logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
	res.cookie('user', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

	console.log("logged out")
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
});

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
	logout,
	updateUserAdmin,
	deleteUserAdmin,
	
};
