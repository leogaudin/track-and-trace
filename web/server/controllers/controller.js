const handle404Error = (res) => {
    return res.status(404).json({ success: false, error: `Item not found` });
};

const createOne = (Model) => async (req, res) => {
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
        } else {
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


const createMany = (Model) => async (req, res) => {
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

const getById = (Model) => async (req, res) => {
    try {
        const instance = await Model.findOne({ id: req.params.id });
        if (!instance)
            return handle404Error(res);
        return res.status(200).json({ success: true, data: instance });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const getAll = (Model) => async (req, res) => {
    try {
        const instances = await Model.find({});
        if (!instances.length)
            return handle404Error(res);
        return res.status(200).json({ success: true, data: instances });
    } catch (error) {
        console.log(error);
        return res.status
            .status(400)
            .json({ success: false, error: error });
    }
}

const deleteOne = (Model) => async (req, res) => {
    try {
        const instance = await Model.findOneAndDelete({ id: req.params.id });
        if (!instance)
            return handle404Error(res);
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
