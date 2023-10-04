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

    const courses = await Course
        .find({ author: 'Ken', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select();


    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.set({
        isPublished: true,
        author: 'Another Author'
    })
    const result = await course.save();
    console.log(result);

}



updateCourse('651dce59349ff08cdc3e3e1d')
