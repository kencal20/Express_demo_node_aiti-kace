const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan');
const logger = require('./logger');
const auth = require('./auth');
const app = express();
const courses = require('./routes/courses')
const debug =require('./debug');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// app.get('env')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet());
app.use(morgan('tiny'));
app.use('/',courses)






if (app.get('env') === 'development') {
    app.use(morgan('tiny'));

}


app.use(debug);
app.use(logger);
app.use(auth)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}.....`))