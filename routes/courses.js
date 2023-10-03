const express = require('express');
const router = express.Router()



const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

router.get('/', (req, res) => {
    res.send('Hello world!! ');
})
router.get('/api/courses', (req, res) => {
    res.send(courses);
})
router.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.send(course)

    }
    else {
        res.status(404).send('the course id stated was not found')
    }



})

router.post('/api/courses', (req, res) => {
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


router.put('/api/courses/:id', (req, res) => {

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


router.delete('/api/courses/:id', (req, res) => {

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
    res.send(`The couse with id ${req.params.id} has been deleted`);

})
module.exports = router;