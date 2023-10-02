const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan');
const logger = require('./logger');
const auth = require('./auth');
const config = require('config');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// app.get('env')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet());
app.use(morgan('tiny'));



console.log('Application Name: ' + config.get('name'));

console.log('Mail Server: ' + config.get('mail.host'));

console.log('Mail Password: ' + config.get('mail.password '));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
 
}



app.use(logger);
app.use(auth)
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

app.get('/', (req, res) => {
    res.send('Hello world!! ');
})
app.get('/api/courses', (req, res) => {
    res.send(courses);
})
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.send(course)

    }
    else {
        res.status(404).send('the course id stated was not found')
    }



})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {

    //look up the course -404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.send(course)

    }
    else {
        res.status(404).send('the course id stated was not found')
    }


    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    // update course

    course.name = req.body.name;

    res.send(course);
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req, res) => {

    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.send(course)

    }
    else {
        res.status(404).send('the course id stated was not found')
    }

    // delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1)

    //respond to client
    res.send(course);

})







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}.....`))