const Box = require('../models/boxes.model')
const { createOne, createMany, getById, getAll, deleteOne } = require('./controller');

const createBox = createOne(Box);
const createBoxes = createMany(Box);
const getBoxById = getById(Box);
const getBoxes = getAll(Box);
const deleteBox = deleteOne(Box);
const getBoxesByAdminId = async (req, res) => {
    try {
        const boxes = await Box.find({ adminId: req.params.adminId });
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
    getBoxes,
    getBoxById,
    getBoxesByAdminId,
}
