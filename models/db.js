// Bring Mongoose into the project
var mongoose = require( 'mongoose' );
var product = require('./product');

// Build the connection string
var dbURI = 'mongodb://homeinventoryuser:HomeInventoryPass@ds040888.mlab.com:40888/homeinventory';

// Create the database connectionp
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


exports.product = mongoose.model( 'product', product.productSchema );
