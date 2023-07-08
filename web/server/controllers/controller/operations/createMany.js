const lzstring = require('lz-string');
const { handle400Error, handle201Success, handle206Success } = require('../errorHandlers');
const { requireApiKey } = require('../apiKey');

const createMany = (Model, apiKeyNeeded = true) => async (req, res) => {
	try {
		const { data } = req.body;
		const payload = lzstring.decompressFromEncodedURIComponent(data);
		const instances = JSON.parse(payload);
		processInstances(instances);

		async function processInstances(instances) {
			const validInstances = [];
			const invalidInstances = [];

			// Check API key only once
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

			for (const instance of instances) {
				if (!instance.id) {
					invalidInstances.push({
						instance,
						error: `You must provide an id for the item`,
					});
					continue;
				}

				if (apiKeyNeeded && !apiKeyChecked) {
					// Skip processing instances if API key check failed
					invalidInstances.push({
						instance,
						error: 'API key check failed',
					});
					continue;
				}

				try {
					const existent = await Model.findOne({ id: instance.id });

					if (existent) {
						invalidInstances.push({
							instance,
							error: `Item with ID ${existent.id} already exists`,
						});
					} else {
						validInstances.push(instance);
					}
				} catch (error) {
					console.error('Error occurred during existing item check:', error);
					return handle400Error(res, error);
				}
			}

			try {
				await Model.insertMany(validInstances);

				if (invalidInstances.length > 0) {
					return handle206Success(
						res,
						'Some items were not created',
						invalidInstances,
						validInstances
					);
				} else {
					return handle201Success(
						res,
						'Items created!',
						invalidInstances,
						validInstances
					);
				}
			} catch (error) {
				console.error('Error occurred during database insertion:', error);
				return handle400Error(res, error);
			}
		}
	} catch (error) {
		console.error('Error occurred during createMany:', error);
		return handle400Error(res, error);
	}
};

module.exports = {
	createMany,
};
