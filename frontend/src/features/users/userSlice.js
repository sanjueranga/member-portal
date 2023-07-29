import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import { login } from '../auth/authSlice';
const initialState = {
	CurrentUser: null,
	allUsers: null,
	totalUsers: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	profileUser: null,
	message: '',
};

//register user

export const register = createAsyncThunk(
	'user/register',
	async (userData, thunkAPI) => {
		try {
			// console.log(userData);
			return await userService.register(userData);
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

//get users

export const getUsers = createAsyncThunk(
	'user/getUsers',
	async (_, thunkAPI) => {
		try {
			return await userService.getUsers();
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

//get user by id
export const getUserById = createAsyncThunk(
	'user/getUsersById',
	async (id, thunkAPI) => {
		try {
			return await userService.getUserById(id);
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
//get get me

export const getMe = createAsyncThunk('user/getMe', async (token, thunkAPI) => {
	try {
		return await userService.getMe(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

//delete user
export const deleteUser = createAsyncThunk(
	'user/delete',
	async (id, thunkAPI) => {
		try {
			return await userService.deleteUser(id);
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

//update user
export const updateUser = createAsyncThunk(
	'user/update',
	async (userData, thunkAPI) => {
		try {
			// console.log('userSlice : ', userData);
			return await userService.updateUser(userData._id, userData);
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

//approve user
export const approveUser = createAsyncThunk(
	'user/approve',
	async (userData, thunkAPI) => {
		try {
			// console.log('userSlice : ', userData);
			return await userService.approveUser(userData._id, userData);
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

//approve user
export const updateRole = createAsyncThunk(
	'user/update/role',
	async (userData, thunkAPI) => {
		try {
			// console.log('userSlice : ', userData);
			return await userService.updateRole(userData._id, userData);
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

//updateAll
export const updateAll = createAsyncThunk(
	'user/updateall',
	async (userData, dispatch, thunkAPI) => {
		try {
			// console.log('userSlice : ', userData);
			// dispatch(login());
			return await userService.updateUser(userData._id, userData);
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

export const logoutUser = createAsyncThunk('auth/logout', async () => {});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: (state) => initialState,
		setInitialUserData: (state, action) => {
			state.user = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(logoutUser.fulfilled, (state) => {
				state.CurrentUser = null;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.CurrentUser = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.totalUsers = action.payload;
				state.allUsers = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.CurrentUser = null;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;

				state.allUsers = state.allUsers.filter(
					(user) => user._id !== action.payload.id
				);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.totalUsers = state.allUsers;
				state.CurrentUser = state.allUsers.find((users) => {
					if (users._id === action.payload.id) {
						return action.payload.id;
					}
				});
				state.allUsers = state.allUsers.filter(
					(user) => user._id !== action.payload.id
				);
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(approveUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(approveUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.totalUsers = state.allUsers;
				state.allUsers = state.allUsers.filter(
					(user) => user._id !== action.payload.id
				);
			})
			.addCase(approveUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateRole.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateRole.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.totalUsers = state.allUsers;
				state.allUsers = state.allUsers.filter(
					(user) => user._id !== action.payload.id
				);
			})
			.addCase(updateRole.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateAll.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAll.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.totalUsers = state.totalUsers;
				state.allUsers = state.allUsers;
				state.CurrentUser = state.allUsers.find((users) => {
					if (users._id === action.payload.id) {
						return users;
					}
				});
			})
			.addCase(updateAll.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.CurrentUser = null;
			})
			.addCase(getMe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.CurrentUser = action.payload;
			})
			.addCase(getMe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.CurrentUser = null;
			})
			.addCase(getUserById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profileUser = action.payload;
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.profileUser = null;
			});
	},
});
export const {setInitialCUserData} = userSlice.actions;
export const { reset } = userSlice.actions;
export default userSlice.reducer;
