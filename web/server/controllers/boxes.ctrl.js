const Box = require('../models/boxes.model');
const Admin = require('../models/admins.model');
const { createOne, createMany, getById, getAll, deleteOne, deleteMany } = require('./controller');

const createBox = createOne(Box);
const createBoxes = createMany(Box);
const getBoxById = getById(Box);
const getBoxes = getAll(Box);
const deleteBox = deleteOne(Box);
const deleteBoxes = deleteMany(Box);
const getBoxesByAdminId = async (req, res) => {
    try {
                // if (!req.headers['x-authorization']) {
        //     return res.status(401).json({ success: false, error: 'API key required' });
        // }
        // const apiKey = req.headers['x-authorization'];
        // const admin = await Admin.findOne({ apiKey });

        // if (!admin) {
        //     return res.status(401).json({ success: false, error: 'Invalid API key' });
        // }
        const adminId = req.params.adminId;
        const boxes = [];
        let skip = 0;
        let limit = 1000;
        let hasMore = true;

        while (hasMore) {
            const result = await Box.find({ adminId }).skip(skip).limit(limit);
            boxes.push(...result);
            skip += limit;
            hasMore = result.length === limit;
        }

        if (!boxes.length)
            return res.status(404).json({ success: false, error: `No boxes available` });

        return res.status(200).json({ success: true, data: boxes });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
}

module.exports = {
    createBox,
    createBoxes,
    deleteBox,
    deleteBoxes,
    getBoxes,
    getBoxById,
    getBoxesByAdminId,
}
