const { handle400Error, handle200Success } = require('../errorHandlers');
const { requireApiKey } = require('../apiKey');

const deleteOne = (Model, apiKeyNeeded = true) => async (req, res) => {
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
			const instance = await Model.findOneAndDelete({ id: req.params.id });

			if (!instance) {
				return handle404Error(res);
			}

			return handle200Success(res, instance);
		}
		else if (apiKeyNeeded && !apiKeyChecked) {
			return handle400Error(res, 'API key check failed');
		}
	} catch (error) {
		console.log(error);
		return handle400Error(res, error);
	}
};

module.exports = {
	deleteOne,
};
