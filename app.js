const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const boards = require('./routes/boards');
const index = require('./routes/index');
const pino = require('express-pino-logger'); // log file 생성
const helmet = require('helmet'); // log file 생성

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(pino());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
// swagger request 시 CORS 문제 발생
// CORS enable
app.use(cors());


// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*/swagger.js', './models/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use('/', index);
app.use('/boards', boards);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/swagger', (req, res) => {
  fs.readFile(path.join(__dirname, '/public/dist/index.html'), (err, html) => {
    if (err) {
      res.end(err);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(html);
    }
  });
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  // mongoose 커넥션 종료
  mongoose.connection.close();
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // mongoose 커넥션 종료
  mongoose.connection.close();
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
