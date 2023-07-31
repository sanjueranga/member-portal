import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;
const API_URL = API_LINK+'/student/project/';

const config = {
	headers: {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'application/json',
	},
};

// crete new project
const createProject = async (projectData) => {
	const response = await axios.post(API_URL + 'create', projectData);
	// console.log(projectData);
	return response.data;
};

//return all project by userid
const getProjectsByUserId = async (id) => {
	const response = await axios.get(API_URL + 'getAll/' + id, config);
	return response.data;
};


//return all project by id
const getProjectsById = async (id) => {
	const response = await axios.get(API_URL + 'get/' + id, config);
	return response.data;
};

// delete project

const deleteProjectById = async (id) => {
	const response = await axios.delete(API_URL + 'delete/' + id);
	return response.data;
};

const updateProject = async (id, projectData) => {
	const response = await axios.put(API_URL + 'update/' + id, projectData);

	return response.data;
};

const projectService = {
	createProject,
	getProjectsByUserId,
	deleteProjectById,
	updateProject,
	getProjectsById
};

export default projectService;
