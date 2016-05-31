var mongoose = require('mongoose');

exports.productSchema = new mongoose.Schema({
    name: {String, required: true},
    createdOn: { type: Date, 'default': Date.now, required: true },
    modifiedOn: { type: Date, default: Date.now, required: true },
    createdBy: String,
    barcode: {String, required: true},
    categories: [String],
    picture : Buffer,
    isActive: {Boolean, 'default': true, required: true},
    currentAmount : {Number, 'default' : 0}
});
