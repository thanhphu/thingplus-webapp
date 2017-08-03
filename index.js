var express = require('express');
var app = express();
 
app.set('views', './views');
app.set('view engine', 'jade');
 
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
 
app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});
 
app.listen(3000);