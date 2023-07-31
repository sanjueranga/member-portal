import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from localstorage



const initialState = {
	user:null,
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
			return await authService.login(user);
			
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
	  return null; // Return null to indicate successful logout
	} catch (error) {
	  // Handle any errors here, if necessary
	  console.error('Error logging out:', error);
	  throw error;
	}
  });



// // get from cookies
  export const getUser = createAsyncThunk('user/getUser', async (token, thunkAPI) => {
	try {
		return await authService.getUser(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
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
		 }
		,setInitialUserData: (state, action) => {
			state.user = action.payload;
		},
		
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
			})
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				
			});
	},
});
export const {setInitialUserData} = authSlice.actions;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
