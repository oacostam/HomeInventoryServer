var mongoose = require('mongoose');

exports.productSchema = new mongoose.Schema({
    name: String,
    createdOn: { type: Date, 'default': Date.now },
    modifiedOn: { type: Date, default: Date.now },
    createdBy: String,
    barcode: String,
    categories: [String],
    picture : Buffer,
    isActive: Boolean,
    currentAmount : Number
});
