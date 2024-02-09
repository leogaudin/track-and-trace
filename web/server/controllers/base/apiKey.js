const Admin = require('../../models/admins.model');
const { handle401Error } = require('./errorHandlers');

const requireApiKey = async (req, res, next) => {
	if (!req.headers['x-authorization']) {
		return handle401Error(res, 'API key required');
	}

	const apiKey = req.headers['x-authorization'];
	const admin = await Admin.findOne({ apiKey });

	if (!admin) {
		return handle401Error(res, 'Invalid API key');
	}

	next();
};

module.exports = {
	requireApiKey,
};
