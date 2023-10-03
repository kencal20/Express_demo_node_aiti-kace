const startupDebugger = require('debug')("app:startup");
const dbDebugger = require('debug')('app:db');
const express = require('express');
const morgan = require('morgan');

const debug = express();



if (debug.get('env') === 'development') {
    debug.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// Db work
dbDebugger('Connected to the database.....');


module.exports = debug;