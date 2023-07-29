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
	logout,
	updateUserAdmin,
	deleteUserAdmin
} = require('../controllers/userController');

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


router.route('/student/').get(getAll); 
router.route('/student/register').post(registerUser);
router.route('/student/login').post(loginUser); 
router.route('/student/logout').get(logout);

router.route('/student/get/:id').get(getUserById);//
router.route('/student/delete/').delete(isAuthenticatedUser,deleteUser);
router.route('/student/update/role/:id').put(isAuthenticatedUser,updateRole)


router.route('/user/').get(isAuthenticatedUser,getUser);

router.route('/student/update/:id').put(isAuthenticatedUser,authorizeRoles('Admin'),updateUserAdmin);
router.route('/student/delete/:id').delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteUserAdmin);
router.route('/student/update').put(isAuthenticatedUser,authorizeRoles('Admin'),updateUser);
router.route('/student/approve/:id').put(isAuthenticatedUser,authorizeRoles('Admin'), approveUser);

module.exports = router;
