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


router.route('/users').get(getAll);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);


router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteUser);
router.route('/update/role/:id').put(isAuthenticatedUser,authorizeRoles('Admin'),updateRole)
router.route('/update/:id').put(isAuthenticatedUser,authorizeRoles('Admin'),updateUser);
router.route('/approve/:id').put(isAuthenticatedUser,authorizeRoles('Admin'), approveUser);
router.route('/get/:id').get(getUserById);
router.route('/user').get(getUser);


module.exports = router;
