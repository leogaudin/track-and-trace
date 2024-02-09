const Admin = require('../models/admins.model')
const { createOne, createMany, getById, getAll, deleteOne } = require('./base');

const createAdmin = createOne(Admin);
const createAdmins = createMany(Admin);
const getAdminById = getById(Admin);
const getAdmins = getAll(Admin);
const deleteAdmin = deleteOne(Admin);

module.exports = {
    createAdmin,
    createAdmins,
    deleteAdmin,
    getAdmins,
    getAdminById,
}
