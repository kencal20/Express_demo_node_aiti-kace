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
        name: 'Angular Course',
        author: 'Ken',
        tag: ['angular', 'frontend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);

}
async function getCourses() {
// or ,and
    const courses = await Course
        .find()
        .sort({ name: 1 })
        .select({ name: 1, tag: 1 })
    console.log(courses);
}


getCourses()
