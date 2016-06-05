var mongoose = require('mongoose');

exports.productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createdOn: { type: Date, 'default': Date.now, required: true },
    modifiedOn: { type: Date, default: Date.now, required: true },
    createdBy: String,
    barcode: {type: String, required: true},
    categories: [String],
    picture : Buffer,
    isActive: {type: Boolean, 'default': true, required: true},
    currentAmount : {type: Number, 'default' : 0}
});
