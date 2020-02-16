const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    description: String,
    duration: Number,
})

module.exports = mongoose.model('Courses', CourseSchema);