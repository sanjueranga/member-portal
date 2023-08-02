import axios from 'axios';
import Cookies from 'js-cookie';
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
  
  
  
};

export default authService;
