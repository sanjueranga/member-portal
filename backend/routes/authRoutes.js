const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUser,
	getAll,
	updateUser,
	deleteUser,
	getUserById,
	approveUser,
	updateRole,logout,
} = require('../controllers/userController');

const {
	createProject,
	getProjectByUserId,
	getAllProjects,
	deletePoject,
	updateProject,
	getProjectById,
} = require('../controllers/projectsController');

const protect = require('../middleware/authMiddleware');
const apiKeyMiddlleware = require('../middleware/apiKeyMiddleware');

router.get('/', getAll);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);


router.post('/project/create', createProject);

router.delete('/delete/:id', apiKeyMiddlleware, deleteUser);
router.delete('/project/delete/:id', deletePoject);

router.put('/update/:id', apiKeyMiddlleware, updateUser);
router.put('/approve/:id', apiKeyMiddlleware, approveUser);
router.put('/project/update/:id', apiKeyMiddlleware, updateProject);
router.put('/update/role/:id', apiKeyMiddlleware, updateRole);

router.get('/get/:id', getUserById);
router.get('/user', protect, getUser);
router.get('/project/getAll/:id', getProjectByUserId);
router.get('/project/get/:id', getProjectById);

router.get('/project', getAllProjects);

module.exports = router;
