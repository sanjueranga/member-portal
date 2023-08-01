import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import Cookies from 'js-cookie';

// const localUser = JSON.parse(Cookies.get('user'));

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};



//login user
export const login = createAsyncThunk(
	'auth/login',
	// 'auth/login',
	async (user, thunkAPI) => {
		try {
			const response = await authService.login(user);
			Cookies.set('user',JSON.stringify(response), { expires: 1 });
			return response;
			
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}

	}
	
);


export const logout = createAsyncThunk('auth/logout', async () => {
	try {
	  await authService.logout();
	  Cookies.remove('user');
	  return null; // Return null to indicate successful logout
	} catch (error) {
	  // Handle any errors here, if necessary
	  console.error('Error logging out:', error);
	  throw error;
	}
  });







export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
		//  }
		// ,setInitialUserData: (state, action) => {
		// 	state.user = action.payload;
		// },
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});
// export const {setInitialUserData} = authSlice.actions;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
