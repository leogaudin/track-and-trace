const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/admins.model');
const crypto = require('crypto');

function generateApiKey() {
  const apiKeyLength = 32;
  const randomBytes = crypto.randomBytes(apiKeyLength);
  const apiKey = randomBytes.toString('hex');
  return apiKey;
}

async function sha512(str) {
	const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
	return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
}

const handleLogin = async (req, res) => {
	try {
		const { username, password } = req.body;
		console.log(req.body)
		if (!username || !password)
			return res.status(400).json({ message: 'Missing username or password' });

		const id = await sha512(username);
		const user = await Admin.findOne({ id });
		if (!user)
			return res.status(404).json({ message: 'A user with this username does not exist' });

		if (password !== user.password)
			return res.status(401).json({ message: 'Invalid password' });

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		user.token = token;
		return res.status(200).json({ user });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const handleRegister = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { username, password, displayName } = req.body;
		if (!username || !password || !displayName)
			return res.status(400).json({ message: 'Missing username, password or name' });
		const createdAt = new Date().getTime();

		const id = await sha512(username);

		const existent = await Admin.findOne({ id });
		if (existent)
			return res.status(409).json({
				success: false,
				error: `User with ID ${existent.id} already exists`,
			});

		const apiKey = generateApiKey();
		const user = { id, email: username, password, apiKey, displayName, createdAt, publicInsights: false };

		const instance = new Admin(user);
		await instance.save();

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		user.token = token;
		return res.status(201).json({ user });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	handleLogin,
	handleRegister,
};
