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
	updateRole,
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

router.get('/', getAll);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/project/create', protect,createProject);

router.delete('/delete',protect, deleteUser);
router.delete('/project/delete/:id',protect, deletePoject);

router.put('/update',protect, updateUser);
router.put('/approve/:id',protect, approveUser);
router.put('/project/update/:id',protect, updateProject);
router.put('/update/role/:id', protect,updateRole);

router.get('/get/:id', getUserById);
router.get('/user',protect, getUser);
router.get('/project/getAll/:id', getProjectByUserId);
router.get('/project/get/:id', getProjectById);

router.get('/project', getAllProjects);

module.exports = router;
