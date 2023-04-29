const Box = require('../models/boxes.model')
const { createOne, createMany, getById, getAll, deleteOne } = require('./controller');

const createBox = createOne(Box);
const createBoxes = createMany(Box);
const getBoxById = getById(Box);
const getBoxes = getAll(Box);
const deleteBox = deleteOne(Box);

module.exports = {
    createBox,
    createBoxes,
    deleteBox,
    getBoxes,
    getBoxById,
}
