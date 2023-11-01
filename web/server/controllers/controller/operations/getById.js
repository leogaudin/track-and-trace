const { handle400Error, handle200Success, handle404Error } = require('../errorHandlers');
const { requireApiKey } = require('../apiKey');

const getById = (Model, apiKeyNeeded = true) => async (req, res) => {
	try {
		if (apiKeyNeeded) {
			return requireApiKey(req, res, async () => {
				const instance = await Model.findOne({ id: req.params.id });

				if (!instance) {
					return handle404Error(res);
				}

				return handle200Success(res, instance);
			});
		}

		const instance = await Model.findOne({ id: req.params.id });

		if (!instance) {
			return handle404Error(res);
		}

		return handle200Success(res, instance);
	} catch (error) {
		console.log(error);
		return handle400Error(res, error);
	}
};

module.exports = {
	getById,
};
