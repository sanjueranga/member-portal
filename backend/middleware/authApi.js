const Student = require('../models/Student')
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");


// Checks if user is authenticated or not
exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    console.log("the time is"+Date.now());
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Student.findById(decoded.id);
    
    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}