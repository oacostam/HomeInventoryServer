var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    createdOn: { type: Date, 'default': Date.now, required: true },
    modifiedOn: { type: Date, 'default': Date.now, required: true },
    createdBy: String,
    barcode: {type: String, required: true, unique: true ,index: true},
    categories: [String],
    picture : Buffer,
    isActive: {type: Boolean, 'default': true, required: true},
    currentAmount : {type: Number, 'default' : 0}
});

schema.plugin(mongoosePaginate);

exports.productSchema = schema;
