const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
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

    // validate -400 
  
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
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
    const result = Joi.validate(req.body, schema);
}



app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.send(course)

    }
    else {
        res.status(404).send('the course id stated was not found')
    }



})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}.....`))