const Box = require('../models/boxes.model');
const Admin = require('../models/admins.model');
const { createOne, createMany, getById, getAll, deleteOne, deleteMany } = require('./base');
const { isFinalDestination } = require('./scans.ctrl');

const createBox = createOne(Box);
const createBoxes = createMany(Box);
const getBoxById = getById(Box);
const getBoxes = getAll(Box);
const deleteBox = deleteOne(Box);
const deleteBoxes = deleteMany(Box);
const getBoxesByAdminId = async (req, res) => {
    try {
        const admin = await Admin.findOne({ id: req.params.adminId });
        if (!admin)
            return res.status(404).json({ success: false, error: `Admin not found` });
        if (!admin.publicInsights) {
            const apiKey = req.headers['x-authorization'];
            if (!apiKey)
                return res.status(401).json({ success: false, error: 'API key required' });
            else if (apiKey !== admin.apiKey) {
                return res.status(401).json({ success: false, error: 'Invalid API key' });
            }
        }

        const boxes = await Box.find({ adminId: req.params.adminId }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));

        if (!boxes.length)
            return res.status(404).json({ success: false, error: `No boxes available` });

        return res.status(200).json({ success: true, data: boxes });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
}

const updateCoordinates = async (req, res) => {
    try {
        const { boxes } = req.body;
        const apiKey = req.headers['x-authorization'];
        if (!apiKey)
            return res.status(401).json({ success: false, error: 'API key required' });
        const admin = await Admin.findOne({ apiKey });
        let updatedCount = 0;
        let matchedCount = 0;
        await Promise.all(boxes.map(async (box) => {
            const result = await Box.updateMany(
                { school: box.school, district: box.district, adminId: admin.id },
                { $set: { schoolLatitude: box.schoolLatitude, schoolLongitude: box.schoolLongitude }},
                { "multi": true }
            );
            matchedCount += result.matchedCount;
            updatedCount += result.modifiedCount;
            return ;
        }));
        await Promise.all(boxes.map(async (box) => {
            const boxesToUpdate = await Box.find({ school: box.school, adminId: admin.id });
            await Promise.all(boxesToUpdate.map(async (box) => {
                box.scans = box.scans || [];
                if (!box.scans.length)
                    return ;
                box.scans.forEach((scan) => {
                    const schoolCoords = {
                        latitude: box.schoolLatitude,
                        longitude: box.schoolLongitude,
                    };
                    const scanCoords = {
                        latitude: scan.location.coords.latitude,
                        longitude: scan.location.coords.longitude,
                    };
                    scan.finalDestination = isFinalDestination(schoolCoords, scanCoords);
                });
                const updatedBox = await Box.updateOne(
                    { id: box.id },
                    { $set: { scans: box.scans } }
                );
            }));
        }));
        return res.status(200).json({ success: true, updatedCount, matchedCount });
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
    updateCoordinates,
}
