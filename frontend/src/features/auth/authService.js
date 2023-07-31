import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;




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

      const response = await axios.post(API_LINK+'/student/login', userData, config);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));

      }

      return response.data;
};

//get from cookies
const getUser = async (token) => {
  const config = {
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_LINK+'/user/', config);
	return response.data;
};


//logout user
const logout = async () => {
  await axios.get(API_LINK+'/student/logout');
 
};

const authService = {
	// register,
	logout,
	login,
  getUser,
  
  
};

export default authService;
