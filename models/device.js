var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
	name: String,
	deviceToken: String
})
module.exports = mongoose.model('Device', DeviceSchema)