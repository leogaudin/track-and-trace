const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scan = new Schema(
	{
		id: { type: String, required: true },
		boxId: { type: String, required: true },
		operatorId: { type: String, required: true },
		time: { type: Number, required: true },
		location: { type: Object, required: true },
		finalDestination: { type: Boolean, required: true },
		markedAsReceived: { type: Boolean, required: true },
		comment: { type: String, required: false }
	}
)

module.exports = mongoose.model('scans', Scan);
