var express = require('express');
var router = express.Router();
var db = require('../models/db');


router.delete('/:barcode', function(req, res){
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        console.log(err);
        res.status = 500;
        return res.send(new Error(err));
      }
      if(!p){
        //Not found
        res.status = 404;
        return res.send(new Error('Not found'));
      }
      p.remove(function (err) {
        if (!err) {
          console.log("product removed");
          //Ok
          res.status = 204;
          return res.send('');
        }else{
          if(err){
            console.log(err);
            res.status = 500;
            return res.send(new Error(err));
          }
        }
    });
   });
});

/* Update Product by id. */
router.put('/:barcode', function(req, res) {
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        console.log(err);
        res.status = 500;
        return res.send(new Error(err));
      }
      if(p){
        p.name = req.body.name;
        p.currentAmount = req.body.currentAmount;
        p.isActive = req.body.isActive;
        p.categories = req.body.categories;
        p.picture = req.body.picture;
        p.modifiedOn = new Date();
        p.save(function (err, p) {
          if(err){
            console.log(err);
            //Not found
            res.status = 500;
            return res.send(new Error(err));
          }else{
            console.log("product updated");
            res.status = 200;
            return res.send(p);
          }
        });
      }else{
        console.log(err);
        //Not found
        res.status = 404;
        return res.send(new Error('Not found'));
      }
    });
});

/* Get product by id. */
router.get('/:barcode', function(req, res) {
    console.log('finding product ' + req.params.barcode);
    db.product.findOne({barcode: req.params.barcode}, function (err, p) {
      if(err){
        res.status = 500;
        return res.send(new Error(err));
      }
      if (p) {
        return res.send(p);
      }else{
        console.log('product ' + req.params.barcode + ' not found');
        return res.send(new db.product({barcode: req.params.barcode}));
      }
  });
});

/* GET products listing. */
router.get('/', function(req, res) {
  var page = req.query.page || 1;
  //var start = req.query.start;
  var limit = req.query.limit || 1;
  debugger;
  var filter = eval(req.query.filter);
  var query = {};
  for(var i=0; i<filter.length; i++){
    query[filter[i].property] = filter[i].value;
  }
  db.product.paginate(query, { page: page, limit: limit }, function(err, p){
     if(err){
        console.log(err);
        //Error
        res.status = 500;
        return res.send(new Error(err)); 
      }
      return res.send(p);
    });
});


/* Post new db.product. */
router.post('/', function(req, res) {
    console.log(req.body);
    var p = new db.product({
        name : req.body.name,
        barcode : req.body.barcode,
        isActive : true,
        currentAmount : req.body.currentAmount ? req.body.currentAmount : 0,
        categories : req.body.categories,
        picture : req.body.picture
    });
    var error = p.validateSync();
    if(error.errors){
        res.status = 500;
        return res.send(new Error('Invalid data')); 
    }
    p.save(function (err) {
      debugger;
      if (err) {
        console.log(err);
        res.status = 500;
        return res.send(new Error(err)); 
      }else{
        return res.send(p);
      }
  });
});

module.exports = router;
