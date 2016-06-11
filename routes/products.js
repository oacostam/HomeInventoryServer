var express = require('express');
var router = express.Router();
var db = require('../models/db');


router.delete('/:barcode', function(req, res, next){
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        console.log(err);
        // HTTP 500
        return res.rest.serverError(err);
      }
      if(!p){
        //HTTP 404 Not found
        return res.rest.notFound('Not found');
      }
      p.remove(function (err) {
        if (!err) {
          console.log("product removed");
          // 204 No content
          return res.rest.noContent('');
        }else{
          if(err){
            console.log(err);
            // HTTP 500
            return res.rest.serverError(err);
          }
        }
    });
   });
});

/* Update Product by id. */
router.put('/:barcode', function(req, res, next) {
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        console.log(err);
        // HTTP 500
        return res.rest.serverError(err);
      }
      if(p){
        p.name = req.body.name;
        p.currentAmount = req.body.currentAmount || 0;
        p.isActive = req.body.isActive || true;
        p.categories = req.body.categories || null;
        p.picture = req.body.picture || null;
        p.modifiedOn = new Date();
        p.save(function (err, p) {
          if(err){
            console.log(err);
            // HTTP 500
            return res.rest.serverError(err);
          }else{
            console.log("product updated");
            return res.rest.success(p);
          }
        });
      }else{
        console.log(err);
        //HTTP 404 Not found
        return res.rest.notFound('Not found');
      }
    });
});

/* Get product by id. */
router.get('/:barcode', function(req, res, next) {
    console.log('finding product ' + req.params.barcode);
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        // HTTP 500
        return res.rest.serverError(err);
      }
      if (p) {
        return res.rest.success(p);
      }else{
        console.log('product ' + req.params.barcode + ' not found');
        return res.rest.success(new db.product({barcode: req.params.barcode}));
      }
  });
});

/* GET products listing. */
router.get('/', function(req, res, next) {
  var page = req.query.page || 1;
  //var start = req.query.start;
  var limit = req.query.limit || 20;
  var filter = JSON.parse(req.query.filter);
  var query = {};
  for(var i=0; i<filter.length; i++){
    query[filter[i].property] = filter[i].value;
  }
  db.product.paginate(query, { page: page, limit: limit }, function(err, p){
     if(err){
        console.log(err);
        // HTTP 500
        return res.rest.serverError(err);
      }
      return res.rest.success(p);
    });
});


/* Post new db.product. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var p = new db.product({
        name : req.body.name,
        barcode : req.body.barcode,
        isActive : true,
        currentAmount : req.body.currentAmount || 0,
        categories : req.body.categories,
        picture : req.body.picture
    });
    var error = p.validateSync();
    if(error && error.errors){
      // HTTP 400
      return res.rest.badRequest('Invalid data'); 
    }
    p.save(function (err) {
      if (err) {
        console.log(err);
        // HTTP 500
        return res.rest.serverError(err.errmsg);
      }else{
        return res.rest.success(p);
      }
  });
});

module.exports = router;
