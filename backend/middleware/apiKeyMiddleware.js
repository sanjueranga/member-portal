// apiKeyMiddleware.js
const validApiKeys = [process.env.CSUP_API_KEY];

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['csup-api-key'] || req.query.apiKey;

    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next();
};

module.exports = apiKeyMiddleware;
