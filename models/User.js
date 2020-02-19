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
        required: false
    },
    age: {
        type: Number,
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