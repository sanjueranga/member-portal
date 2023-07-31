import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;
import Cookies from 'js-cookie';



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
        Cookies.set('user', JSON.stringify(response.data.user) , { expires: 1 });

      }

      return response.data;
};




//logout user
const logout = async () => {
  await axios.get(API_LINK+'/student/logout');
  localStorage.removeItem('user');
  Cookies.remove('user');
};

const authService = {
	// register,
	logout,
	login,
  getUser,
  
  
};

export default authService;
