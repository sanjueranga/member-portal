import axios from 'axios';

const API_URL = '/student/';
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
	const response = await axios.delete(API_URL + 'delete/' + id);
	return response.data;
};

//update user
const updateUser = async (id, userData) => {
	// console.log('userService : ', userData);
	const response = await axios.put(
		API_URL + 'update/' + id,
		userData
		// {userStatus: true,confirmDate: applyDate,approvedBy: user.name,}
	);

	return response.data;
};

const approveUser = async (id, userData) => {
	// console.log('userService : ', userData);
	const response = await axios.put(
		API_URL + 'approve/' + id,
		userData
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
};

export default userService;
