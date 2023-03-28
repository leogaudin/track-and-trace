const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Box = new Schema(
	{
		id: {type: Number, required: true},
		division: {type: String, required: false},
		district: {type: String, required: false},
		zone: {type: String, required: false},
		school: {type: String, required: true},
		htName: {type: String, required: false},
		htPhone: {type: Number, required: true},
		institutionType: {type: String, required: false}
	}
)

module.exports = mongoose.model('boxes', Box);
