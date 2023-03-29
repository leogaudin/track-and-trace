const Admin = require('../models/admins.model')

const addAdmin = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a admin',
        })
    }

    const admin = new Admin(body)

    if (!admin) {
        return res.status(400).json({ success: false, error: err })
    }

    admin
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: admin.id,
                message: 'Admin created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Admin not created!',
            })
        })
}

const getAdminById = async (req, res) => {
	try {
		const admin = await Admin.findOne({ id: req.params.id })
		if (!admin) {
			return res
			.status(404)
			.json({ success: false, error: 'Admin not found' })
		}
		return res
			.status(200)
			.json({ success: true, data: admin })
	} catch (err) {
		console.log(err)
		return res
			.status(400)
			.json({ success: false, error: err })
	}
}

const getAdmins = async (req, res) => {
	try {
		const admins = await Admin.find({});
		if (!admins.length) {
			return res
				.status(404)
				.json({ success: false, error: 'Admin not found' })
		}
		return res
			.status(200)
			.json({ success: true, data: admins });
	} catch (err) {
		console.log(err);
		return res.status
			.status(400)
			.json({ success: false, error: err });
	}
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOneAndDelete({ id: req.params.id });
        if (!admin) {
            return res.status(404).json({ success: false, error: `Admin not found` });
        }
        return res.status(200).json({ success: true, data: admin });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
};


module.exports = {
    addAdmin,
	deleteAdmin,
    getAdmins,
    getAdminById,
}
