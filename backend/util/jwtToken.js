// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();
    
    // Convert user object to JSON string
    const userJsonString = JSON.stringify(user);

    // Options for cookie
    const options = {
        expires: new Date(Date.now()  + 12* 60* 60 * 1000),
        httpOnly: true
    }
    // // Save token and user data in the cookie
    res.status(statusCode)
        .cookie('token', token, options)
        .cookie('user', userJsonString, options)
        .json({
            success: true,
            token,
            user
        });
}



module.exports = sendToken;