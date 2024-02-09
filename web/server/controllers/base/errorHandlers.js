const handle404Error = (res) => {
	return res.status(404).json({ success: false, error: `Item not found` });
};

const handle401Error = (res, error) => {
	return res.status(401).json({ success: false, error });
};

const handle400Error = (res, error) => {
	return res.status(400).json({ success: false, error });
};

const handle409Error = (res, error) => {
	return res.status(409).json({ success: false, error });
};

const handle201Success = (res, message, invalidInstances, validInstances) => {
	return res.status(201).json({
		success: true,
		message,
		invalidInstances,
		validInstances,
	});
};

const handle206Success = (res, message, invalidInstances, validInstances) => {
	return res.status(206).json({
		success: true,
		message,
		invalidInstances,
		validInstances,
	});
};

const handle200Success = (res, data) => {
	return res.status(200).json({ success: true, data });
};

module.exports = {
	handle404Error,
	handle401Error,
	handle400Error,
	handle409Error,
	handle201Success,
	handle206Success,
	handle200Success,
};
