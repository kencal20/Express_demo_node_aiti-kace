const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan');
const logger = require('./logger');
const auth = require('./auth');
const app = express();
const courses = require('./routes/courses')
const debug = require('./debug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet());

// Conditionally add morgan middleware for development environment
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.use('/', courses);
app.use(debug);
app.use(logger);
app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`))
