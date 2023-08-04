const Scan = require('../models/scans.model');
const Admin = require('../models/admins.model');
const Box = require('../models/boxes.model');
const { createOne, createMany, getById, getAll, deleteOne } = require('./controller');
const { getCountryNameLocal } = require('./country.ctrl');

const createScan = async (req, res) => {
    try {
        const { boxId, comment, id, operatorId, location, time, finalDestination } = req.body;

        const countryName = getCountryNameLocal(location.coords.longitude, location.coords.latitude);

        const newScan = {
            boxId,
            comment,
            id,
            operatorId,
            location,
            countryName,
            time,
            finalDestination,
        };

        const box = await Box.findOne({ id: boxId });

        if (!box)
            return res.status(404).json({ error: "Box not found" });

        box.scans = box.scans || [];

        box.scans.push(newScan);

        await Box.updateOne({ id: boxId }, { $set: { scans: box.scans } });

        return res.status(200).json({ message: "Scan added successfully", box });
    } catch (error) {
        console.error("Error adding scan:", error);
        return res.status(500).json({ error: "An error occurred while adding the scan" });
    }
};
const createScans = createMany(Scan, false);
const getScanById = getById(Scan);
const getScans = getAll(Scan);
const deleteScan = deleteOne(Scan);
const getScansByBoxes = async (req, res) => {
    try {
        if (!req.headers['x-authorization']) {
            return res.status(401).json({ success: false, error: 'API key required' });
        }
        const apiKey = req.headers['x-authorization'];
        const admin = await Admin.findOne({ apiKey });

        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid API key' });
        }
        const boxes = req.body;
        const scans = await Scan.find({ boxId: { $in: boxes } });
        if (!scans.length)
            return res.status(404).json({ success: false, error: `No scans available` });
        return res.status(200).json({ success: true, data: scans });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
}

module.exports = {
    createScan,
    createScans,
    deleteScan,
    getScans,
    getScanById,
    getScansByBoxes,
}
