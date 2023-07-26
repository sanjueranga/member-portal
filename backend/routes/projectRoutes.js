const express = require('express');
const router = express.Router();

const {
	createProject,
	getProjectByUserId,
	getAllProjects,
	deletePoject,
	updateProject,
	getProjectById,
} = require('../controllers/projectsController');

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


router.route('/project/create').post(isAuthenticatedUser, createProject);
router.route('/project/update/:id').put(isAuthenticatedUser, updateProject);
router.route('/project/delete/:id').delete(isAuthenticatedUser,authorizeRoles('Admin'), deletePoject);
router.route('/project/getAll/:id').get(getProjectByUserId);
router.route('/project/get/:id').get(getProjectById);
router.route('/project').get(getAllProjects);

module.exports = router;