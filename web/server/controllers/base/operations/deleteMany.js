const { handle400Error, handle404Error, handle200Success } = require('../errorHandlers');
const { requireApiKey } = require('../apiKey');

const deleteMany = (Model, apiKeyNeeded = true) => async (req, res) => {
	try {
		let apiKeyChecked = false;
		if (apiKeyNeeded) {
			try {
				await requireApiKey(req, res, async () => {
					apiKeyChecked = true;
				});
			} catch (error) {
				console.error('Error occurred during API key check:', error);
				return handle400Error(res, error);
			}
		}

		if (apiKeyNeeded && apiKeyChecked || !apiKeyNeeded) {
			const { deleteConditions } = req.body;

			if (!deleteConditions) {
				return handle400Error(res, 'No delete conditions provided');
			}

			const instances = await Model.deleteMany(deleteConditions);

			if (instances.deletedCount === 0) {
				return handle404Error(res);
			}

			return handle200Success(res, instances);
		} else if (apiKeyNeeded && !apiKeyChecked) {
			return handle400Error(res, 'API key check failed');
		}
	} catch (error) {
		console.log(error);
		return handle400Error(res, error);
	}
};

module.exports = {
	deleteMany,
};
