const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    course_type: {
        type: String,
        default: null
    },
    course_category: {
        type: String,
        default: null
    },
    description: String,
    duration: Number,
    rating: {
        type: Number,
        default: null
    },
    instructor: {
        type: String,
        default: null
    },
    university: {
        type: String,
        default: null
    },
    uni_exclusive:{
        type: String,
        default: false
    },
    content: {
        type: String,
        default: null
    },
    users_enrolled: {
        type: [String],
        default: null
    },
    no_enrolled:{
        type: Number,
        default: 0
    },
    rating:{
        type: Number,
        default: null
    },
    no_views:{
        type: Number,
        default: 0
    },
    credits:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Courses', CourseSchema);