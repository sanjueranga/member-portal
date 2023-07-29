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
	logout
} = require('../controllers/userController');

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


router.route('/student/').get(getAll); 
router.route('/student/register').post(registerUser);
router.route('/student/login').post(loginUser); 
router.route('/student/logout').get(logout);

router.route('/student/get/:id').get(getUserById);//
router.route('/student/delete/:id').delete(isAuthenticatedUser,deleteUser);
router.route('/student/update/role/:id').put(isAuthenticatedUser,authorizeRoles('Admin'),updateRole)
router.route('/student/update/:id').put(isAuthenticatedUser,updateUser);
router.route('/student/approve/:id').put(isAuthenticatedUser,authorizeRoles('Admin'), approveUser);

router.route('/user/').get(isAuthenticatedUser,getUser);


module.exports = router;
