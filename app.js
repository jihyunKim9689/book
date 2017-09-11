var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var expressValidator = require('express-validator');
var fs = require('fs');
var cors = require('cors');
var mongoose = require('mongoose');
var boards = require('./routes/boards');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public','dist')));
app.use(express.static(path.join(__dirname, 'public')));
//validator
app.use(expressValidator());
//swagger request 시 CORS 문제 발생
//CORS enable
app.use(cors());

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*/*.js', './models/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.use('/', index);
app.use('/users', users);
app.use('/boards', boards);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/swagger',function(req,res){
  console.log(path.join(__dirname, 'swagger', 'dist'));
  fs.readFile(__dirname + '/public/dist/index.html', (err, html) => {
    if(err){
      res.end(err);
    }else{
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(html);
    }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');

  //mongoose 커넥션 종료
  mongoose.connection.close();

  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //mongoose 커넥션 종료
  mongoose.connection.close();

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
