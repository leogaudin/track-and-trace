const Scan = require('../models/scans.model')
const { createOne, createMany, getById, getAll, deleteOne } = require('./controller');

const createScan = createOne(Scan);
const createScans = createMany(Scan);
const getScanById = getById(Scan);
const getScans = getAll(Scan);
const deleteScan = deleteOne(Scan);

module.exports = {
    createScan,
    createScans,
    deleteScan,
    getScans,
    getScanById,
}
