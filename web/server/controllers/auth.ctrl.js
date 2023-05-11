const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/admins.model');

async function sha512(str) {
	const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
	return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
}

const handleLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({ message: 'Missing email or password' });

		const id = await sha512(email);
		const user = await Admin.findOne({ id });
		if (!user)
			return res.status(404).json({ message: 'A user with this email does not exist' });

		const providedPassword = await sha512(password);
		if (!(providedPassword === user.password))
			return res.status(401).json({ message: 'Invalid password' });

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		return res.status(200).json({ token });
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

		const { email, password, displayName } = req.body;
		if (!email || !password || !displayName)
			return res.status(400).json({ message: 'Missing email, password or name' });
		const createdAt = new Date().getTime();

		const id = await sha512(email);

		const existent = await Admin.findOne({ id });
		if (existent)
			return res.status(409).json({
				success: false,
				error: `User with ID ${existent.id} already exists`,
			});

		const hashedPassword = await sha512(password);
		const user = { id, email, password: hashedPassword, displayName, createdAt };

		const instance = new Admin(user);
		await instance.save();

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		return res.status(201).json({ token });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	handleLogin,
	handleRegister,
};
