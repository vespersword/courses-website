const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: false
    },
    user_type: {
        type: String,
        default: "General"
    },
    enrolled_courses: {
        type: [String],
        default: null
    }
})

module.exports = mongoose.model('Users', UserSchema);