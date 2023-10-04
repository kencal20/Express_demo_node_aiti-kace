const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground ')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect the db'))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tag: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema)

async function createCourse() {

    const course = new Course({
        name: 'Node.js Course',
        author: 'Ken',
        tag: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);

}

createCourse();
