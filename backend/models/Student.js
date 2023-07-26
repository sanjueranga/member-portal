const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
	},
	applyDate: {
		type: String,
		required: true,
	},
	confirmDate: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	contactNumber: {
		type: Number,
		required: true,
	},
	regNo: {
		type: String,
		required: true,
	},
	userStatus: {
		type: Boolean,
		required: true,
	},
	gender: {
		type: String,
	},
	birthDate: {
		type: String,
	},
	facebook: {
		type: String,
	},
	twitter: {
		type: String,
	},
	linkdin: {
		type: String,
	},
	instagram: {
		type: String,
	},
	github: {
		type: String,
	},
	cv: {
		type: String,
	},
	approvedBy: {
		type: String,
	},
	headline: {
		type: String,
	},
	about: {
		type: String,
	},
	website: {
		type: String,
	},
	skills: {
		type: String,
	},
});
studentSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
