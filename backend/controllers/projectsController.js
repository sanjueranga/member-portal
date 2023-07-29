const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc    Register new user
// @route   POST /api/project
// @access  Public
const createProject = asyncHandler(async (req, res) => {
	const { userId, email, title, desc, github, website, tags } = req.body;

	if (!userId || !title) {
		res.status(400);
		throw new Error('Please add at title');
	}

	const  project = await Project.create({
		userId,
		email,
		title,
		desc,
		github,
		website,
		tags,
	});
	if(project){
		console.log("project created succesfully")
		res.status(201).json({
			_id: project.id,
			name: project.title,
			
		});
	}

});

// get all projects
const getAllProjects = asyncHandler(async (req, res) => {
	Project.find()
		.then((project) => {
			res.json(project);
		})
		.catch((err) => {
			console.log(err);
		});
});


const getProjectById = asyncHandler(async (req, res)=>{
	let id = req.params.id;
	
	const project = await Project.findById(id);

	res.status(200).json(project);
});



// get project by id
const getProjectByUserId = asyncHandler(async (req, res) => {
	let user = req.params.id;
	const project = await Project.find({ userId: user });

	res.status(200).json(project);
});

// delete project

const deletePoject = asyncHandler(async (req, res) => {
	let p_id = req.params.id;
	// const project = await Project.findOne({ p_id });
	await Project.findByIdAndDelete(p_id)
		.then(() => {
			res.status(200).send({ status: 'Project Deleted', id: req.params.id });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with deleting data', error: err.message });
		});
});
// update project
const updateProject = asyncHandler(async (req, res) => {
	let projectId = req.params.id;

	const { title, desc, github, website, tags } = req.body;

	const updateProjectData = {
		title,
		desc,
		github,
		website,
		tags,
	};

	await Project.findByIdAndUpdate(projectId, updateProjectData)
		.then(() => {
			res.status(200).send({ status: 'Project is Updated',id: req.params.id, data: updateProjectData });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ send: 'Error with updating data', error: err.message });
		});
});

module.exports = {
	createProject,
	getProjectByUserId,
	getAllProjects,
	deletePoject,
	updateProject,
	getProjectById
};
