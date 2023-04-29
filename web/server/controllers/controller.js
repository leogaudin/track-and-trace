const createOne = (Model) => async (req, res) => {
    try {
        const body = req.body;
		body.createdAt = new Date().getTime();
        if (!body) {
            return res.status(400).json({
                success: false,
                error: `You must provide a ${Model.modelName}`,
            });
        }

        const existent = await Model.findOne({ id: body.id });
        if (existent) {
            return res.status(409).json({
                success: false,
                error: `A ${Model.modelName} with this ID already exists: ${Model.modelName} n°${existent.id}`,
            });
        }

        const instance = new Model(body);
        if (!instance) {
            return res.status(400).json({ success: false, error: err });
        }

        await instance.save();
        return res.status(201).json({
            success: true,
            id: instance.id,
            message: `${Model.modelName} created!`,
        });
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
                    error: `You must provide an id for the ${Model.modelName}`,
                });
                continue;
            }

            const existent = await Model.findOne({ id: instance.id });
            if (existent) {
                invalidInstances.push({
                    instance,
                    error: `A ${Model.modelName} with this ID already exists: ${Model.modelName} n°${existent.id}`,
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
                message: `Some ${Model.modelName}s were not created`,
                invalidInstances,
                validInstances,
            });
        } else {
            return res.status(201).json({
                success: true,
                message: `${Model.modelName}s created!`,
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
        if (!instance) {
            return res.status(404).json({ success: false, error: `${Model.modelName} not found` });
        }
        return res.status(200).json({ success: true, data: instance });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
};

const getAll = (Model) => async (req, res) => {
    try {
        const instances = await Model.find({});
        if (!instances.length) {
            return res.status(404).json({ success: false, error: `${Model.modelName} not found` });
        }
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
        if (!instance) {
            return res.status(404).json({ success: false, error: `${Model.modelName} not found` });
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
