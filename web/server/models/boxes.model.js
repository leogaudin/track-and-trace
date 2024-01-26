const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Box = new Schema(
	{
		id: { type: String, required: true },
		project: { type: String, required: true },
		division: { type: String, required: false },
		district: { type: String, required: false },
		zone: { type: String, required: false },
		school: { type: String, required: true },
		htName: { type: String, required: false },
		htPhone: { type: String, required: true },
		institutionType: { type: String, required: false },
		adminId: { type: String, required: true },
		createdAt: { type: Date, required: true },
		scans: { type: Array, required: false },
		school_latitude: { type: Number, required: false},
		school_longitude: { type: Number, required: false},
	}
)

module.exports = mongoose.model('boxes', Box);
