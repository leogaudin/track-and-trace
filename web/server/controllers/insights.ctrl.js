const Admin = require('../models/admins.model')

const setInsights = async (req, res) => {
	try {
		const { id, publicInsights } = req.body;
		if (typeof publicInsights !== 'boolean')
			return res.status(400).json({ message: 'Missing publicInsights' });

		const admin = await Admin.findOne({ id });
		if (!admin)
			return res.status(404).json({ message: 'Admin not found' });

		admin.publicInsights = publicInsights;
		await admin.save();
		return res.status(200).json({ message: 'Successfully set insights to ' + publicInsights });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const getInsights = async (req, res) => {
	try {
		const { id } = req.params;

		const admin = await Admin.findOne({ id });
		if (!admin)
			return res.status(404).json({ message: 'Admin not found' });

		return res.status(200).json({ publicInsights: admin.publicInsights });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	setInsights,
	getInsights
}
