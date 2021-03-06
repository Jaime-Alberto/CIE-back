var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
require('pretty-console-colors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/event');
var serviceRouter = require('./routes/service');
var tracingRouter = require('./routes/tracing');
var projectRouter = require('./routes/project');
var ConfigRouter = require('./routes/config');
var StructureDB = require('./infrastructure/structureDB').StructureDB;
var SocketServer = require('./infrastructure/SocketServer').SocketServer;

console.info('Init Server PORT ', process.env.PORT);

const structureDB =  new StructureDB();
const sockServer = new SocketServer();
sockServer.socketServerOn();

structureDB.createAll();

var app = express();
dotenv.config();

   

function cors(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, '+
    'X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event', eventRouter);
app.use('/service', serviceRouter);
app.use('/tracing', tracingRouter);
app.use('/project', projectRouter);
app.use('/config', ConfigRouter);

module.exports = app;
