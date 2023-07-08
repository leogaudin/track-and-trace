const { handle400Error, handle409Error, handle201Success } = require('../errorHandlers');
const { requireApiKey } = require('../apiKey');

const createOne = (Model, apiKeyNeeded = true) => async (req, res) => {
	try {
		const body = req.body;
		body.createdAt = new Date().getTime();

		if (!body) {
			return handle400Error(res, 'You must provide an item');
		}

		if (apiKeyNeeded) {
			return requireApiKey(req, res, async () => {
				const existent = await Model.findOne({ id: body.id });

				if (existent) {
					return handle409Error(res, `Item with ID ${existent.id} already exists`);
				}

				const instance = new Model(body);

				if (!instance) {
					return handle400Error(res, err);
				}

				await instance.save();
				return handle201Success(res, {
					id: instance.id,
					message: `Item created!`,
				});
			});
		}

		const existent = await Model.findOne({ id: body.id });

		if (existent) {
			return handle409Error(res, `Item with ID ${existent.id} already exists`);
		}

		const instance = new Model(body);

		if (!instance) {
			return handle400Error(res, err);
		}

		await instance.save();
		return handle201Success(res, {
			id: instance.id,
			message: `Item created!`,
		});
	} catch (error) {
		console.log(error);
		return handle400Error(res, error);
	}
};

module.exports = {
	createOne,
};
