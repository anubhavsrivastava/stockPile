var express = require('express');
var router = express.Router();
var dirty = require('dirty');
var db =  dirty('user.db');
var consoleMessage = "";
var console= {};

console.log =function(messa){
consoleMessage+='\n'+consoleMessage;
} ;
 
db.on('drain', function() {
    console.log('All records are saved on disk now.');
 });

router.get('/log', function(req, res, next) {
  res.send(consoleMessage);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/create', function(req, res, next) {

  db.set(req.body.id,req.body,function(){
  	res.send(req.body);
  });

});

router.post('/update', function(req, res, next) {

  db.rm(req.body.id,function(){

  	db.set(req.body.id,req.body,function(){
  	res.send(req.body);
    });
 });

});

router.get('/get/:id', function(req, res, next) {

 db.forEach(function(key, val) {
	console.log(key);
		if(key==req.params.id)
		{
			res.send(val);
		 }

});

res.send("Not Found :" +req.params.id);
});

router.get('/getAll', function(req, res, next) {
  var data = [];
   db.forEach(function(key, val) {
      data.push({key:val.id, value:val});
    });

   res.send(data);

});
module.exports = router;
