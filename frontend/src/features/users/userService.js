import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;
const API_URL = API_LINK + '/student/'
const apiKey = process.env.REACT_APP_CSUP_API_KEY;
//create new user
const register = async (userData) => {
	const response = await axios.post(API_URL + 'register/', userData);
	return response.data;
};

//get users
const getUsers = async () => {
	const config = {
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'application/json',
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};
const getUserById = async (id) => {
	const config = {
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'application/json',
		},
	};
	const response = await axios.get(API_URL + 'get/' + id, config);
	return response.data;
};
//getme

const getMe = async (token) => {

	const config = {
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL + 'user/', config);
	return response.data;
};


//delete users
const deleteUser = async (id) => {
	const headers = {
		'csup-api-key': apiKey
	}
	const response = await axios.delete(API_URL + 'delete/' + id, { headers });
	return response.data;
};

//update user
const updateUser = async (id, userData) => {
	const headers = {
		'csup-api-key': apiKey
	}
	// console.log('userService : ', userData);
	const response = await axios.put(
		API_URL + 'update/' + id,
		userData,
		{ headers }
		// {userStatus: true,confirmDate: applyDate,approvedBy: user.name,}
	);

	return response.data;
};

const approveUser = async (id, userData) => {
	const headers = {
		'csup-api-key': apiKey
	}
	// console.log('userService : ', userData);
	const response = await axios.put(
		API_URL + 'approve/' + id,
		userData,
		{ headers }
		// {userStatus: true,confirmDate: applyDate,approvedBy: user.name,}
	);

	return response.data;
};
const updateRole = async (id, userData) => {
	// console.log('userService : ', userData);
	const headers = {
		'csup-api-key': apiKey
	}
	const response = await axios.put(
		API_URL + 'update/role/' + id,
		userData,
		{ headers }
		// {userStatus: true,confirmDate: applyDate,approvedBy: user.name,}
	);

	return response.data;
};
const userService = {
	register,
	getUsers,
	deleteUser,
	updateUser,
	getMe,
	approveUser,
	getUserById,
	updateRole,
};

export default userService;
