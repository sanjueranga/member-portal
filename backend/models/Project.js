const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	github: {
		type: String,
	},
	website: {
		type: String,
	},
	tags:{
		type: String,
	}
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
