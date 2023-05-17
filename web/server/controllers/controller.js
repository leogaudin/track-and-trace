const Admin = require('../models/admins.model');

const handle404Error = (res) => {
    return res.status(404).json({ success: false, error: `Item not found` });
};

const handle401Error = (res, error) => {
    return res.status(401).json({ success: false, error });
};

const createOne = (Model, apiKeyNeeded = true) => async (req, res) => {
    try {
        const body = req.body;
        body.createdAt = new Date().getTime();

        let status, json;
        if (!body) {
            status = 400;
            json = {
                success: false,
                error: `You must provide an item`,
            };
        } else if (apiKeyNeeded && !req.headers['x-authorization']) {
            status = 401;
            json = {
                success: false,
                error: 'API key required',
            };
        } else if (apiKeyNeeded) {
            const apiKey = req.headers['x-authorization'];
            const admin = await Admin.findOne({ apiKey });

            if (!admin) {
                status = 401;
                json = {
                    success: false,
                    error: 'Invalid API key',
                };
            }
        }

        if (!status) {
            const existent = await Model.findOne({ id: body.id });
            if (existent) {
                status = 409;
                json = {
                    success: false,
                    error: `Item with ID ${existent.id} already exists`,
                };
            } else {
                const instance = new Model(body);
                if (!instance) {
                    status = 400;
                    json = { success: false, error: err };
                } else {
                    await instance.save();
                    status = 201;
                    json = {
                        success: true,
                        id: instance.id,
                        message: `Item created!`,
                    };
                }
            }
        }
        return res.status(status).json(json);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const createMany = (Model, apiKeyNeeded = true) => async (req, res) => {
    try {
        const instances = req.body;
        const validInstances = [];
        const invalidInstances = [];

        for (const instance of instances) {
            if (!instance.id) {
                invalidInstances.push({
                    instance,
                    error: `You must provide an id for the item`,
                });
                continue;
            }

            if (apiKeyNeeded && !req.headers['x-authorization']) {
                invalidInstances.push({
                    instance,
                    error: 'API key required',
                });
                continue;
            }

            if (apiKeyNeeded) {
                const apiKey = req.headers['x-authorization'];
                const admin = await Admin.findOne({ apiKey });

                if (!admin) {
                    invalidInstances.push({
                        instance,
                        error: 'Invalid API key',
                    });
                    continue;
                }
            }

            const existent = await Model.findOne({ id: instance.id });
            if (existent) {
                invalidInstances.push({
                    instance,
                    error: `Item with ID ${existent.id} already exists`,
                });
                continue;
            }

            instance.createdAt = new Date().getTime();
            validInstances.push(new Model(instance));
        }

        await Model.insertMany(validInstances);
        if (invalidInstances.length > 0) {
            return res.status(206).json({
                success: true,
                message: `Some items were not created`,
                invalidInstances,
                validInstances,
            });
        } else {
            return res.status(201).json({
                success: true,
                message: `Items created!`,
                validInstances,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const getById = (Model, apiKeyNeeded = true) => async (req, res) => {
    try {
        if (apiKeyNeeded && !req.headers['x-authorization']) {
            return handle401Error(res, 'API key required');
        }

        if (apiKeyNeeded) {
            const apiKey = req.headers['x-authorization'];
            const admin = await Admin.findOne({ apiKey });

            if (!admin) {
                return handle401Error(res, 'Invalid API key');
            }
        }

        const instance = await Model.findOne({ id: req.params.id });
        if (!instance) {
            return handle404Error(res);
        }
        return res.status(200).json({ success: true, data: instance });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const getAll = (Model, apiKeyNeeded = true) => async (req, res) => {
    try {
        if (apiKeyNeeded && !req.headers['x-authorization']) {
            return handle401Error(res, 'API key required');
        }

        if (apiKeyNeeded) {
            const apiKey = req.headers['x-authorization'];
            const admin = await Admin.findOne({ apiKey });

            if (!admin) {
                return handle401Error(res, 'Invalid API key');
            }
        }

        const instances = await Model.find({});
        if (!instances.length) {
            return handle404Error(res);
        }
        return res.status(200).json({ success: true, data: instances });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const deleteOne = (Model, apiKeyNeeded = true) => async (req, res) => {
    try {
        if (apiKeyNeeded && !req.headers['x-authorization']) {
            return handle401Error(res, 'API key required');
        }

        if (apiKeyNeeded) {
            const apiKey = req.headers['x-authorization'];
            const admin = await Admin.findOne({ apiKey });

            if (!admin) {
                return handle401Error(res, 'Invalid API key');
            }
        }

        const instance = await Model.findOneAndDelete({ id: req.params.id });
        if (!instance) {
            return handle404Error(res);
        }
        return res.status(200).json({ success: true, data: instance });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

module.exports = {
    createOne,
    createMany,
    getById,
    getAll,
    deleteOne,
};
