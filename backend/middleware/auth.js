const User = require('../models/Student')
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/errorHandler");
const asyncHandler = require('express-async-handler');


// Checks if user is authenticated or not
exports.isAuthenticatedUser= asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
  
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Get user from the token
        req.user = await Student.findById(decoded.id).select('-password');
  
        next();
      } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Not Authorized', 401));
      }
    }
  
    if (!token) {
      return next(new ErrorHandler('Not Authorized, No Token', 401));
    }
  });
  

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