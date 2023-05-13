const Scan = require('../models/scans.model')
const { createOne, createMany, getById, getAll, deleteOne } = require('./controller');

const createScan = createOne(Scan);
const createScans = createMany(Scan);
const getScanById = getById(Scan);
const getScans = getAll(Scan);
const deleteScan = deleteOne(Scan);
const getScansByBoxes = async (req, res) => {
    try {
        const boxes = req.body;
        const scans = await Scan.find({boxId: {$in: boxes } });
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
