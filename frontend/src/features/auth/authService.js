import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;
const API_LOGIN = API_LINK+'/student/login/';

//login user
const login = async (userData) => {
	const config = {
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'application/json',
		},
	};
	const response = await axios.post(API_LOGIN, userData, config);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

//logout user
const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	// register,
	logout,
	login,
};

export default authService;
