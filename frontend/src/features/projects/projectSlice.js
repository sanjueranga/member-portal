import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import projectService from './projectService';

const initialState = {
	projectIsError: false,
	projectIsSuccess: false,
	projectIsLoading: false,
	allProjects: null,
	currentProject:null,
	message: '',
};

// create project

export const create = createAsyncThunk(
	'project/create',
	async (projectData, thunkAPI) => {
		try {
			// console.log(projectData);
			return await projectService.createProject(projectData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get project by userid
export const getProjectByUserId = createAsyncThunk(
	'project/getallproject',
	async (id, thunkAPI) => {
		try {
			return await projectService.getProjectsByUserId(id);
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

export const getProjectById = createAsyncThunk(
	'project/getprojectById',
	async (id, thunkAPI) => {
		try {
			return await projectService.getProjectsById(id);
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






// delete project
export const deleteProject = createAsyncThunk(
	'project/delete',
	async (id, thunkAPI) => {
		try {
			return await projectService.deleteProjectById(id);
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

// update project data

export const updateProject = createAsyncThunk(
	'/project/update',
	async (projectData, thunkAPI) => {
		try {
			return await projectService.updateProject(projectData._id, projectData);
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

export const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(create.pending, (state) => {
				state.projectIsLoading = true;
			})
			.addCase(create.fulfilled, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsSuccess = true;
				state.allProjects = action.payload;
			})
			.addCase(create.rejected, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsError = true;
				state.message = action.payload;
			})
			.addCase(getProjectByUserId.pending, (state) => {
				state.projectIsLoading = true;
			})
			.addCase(getProjectByUserId.fulfilled, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsSuccess = true;
				state.allProjects = action.payload;
			})
			.addCase(getProjectByUserId.rejected, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsError = true;
				state.message = action.payload;
			})
			.addCase(getProjectById.pending, (state) => {
				state.projectIsLoading = true;
			})
			.addCase(getProjectById.fulfilled, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsSuccess = true;
				state.currentProject = action.payload;
			})
			.addCase(getProjectById.rejected, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsError = true;
				state.message = action.payload;
			})
			.addCase(deleteProject.pending, (state) => {
				state.projectIsLoading = true;
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsSuccess = true;
				state.allProjects = state.allProjects.filter(
					(project) => project._id !== action.payload.id
				);
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsError = true;
				state.message = action.payload;
			})
			.addCase(updateProject.pending, (state) => {
				state.projectIsLoading = true;
			})
			.addCase(updateProject.fulfilled, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsSuccess = true;
				state.allProjects = state.allProjects.map((project) => {
					if (project._id === action.payload.id) {
						project.title = action.payload.data.title;
						project.desc = action.payload.data.desc;
						project.github = action.payload.data.github;
						project.website = action.payload.data.website;
						project.tags = action.payload.data.tags;

					}
					return project;
				});
			})
			.addCase(updateProject.rejected, (state, action) => {
				state.projectIsLoading = false;
				state.projectIsError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
