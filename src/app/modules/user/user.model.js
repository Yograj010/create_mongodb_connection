/*---Defining schema----*/
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    middle_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    photo: {
        type: String
    },
    status: {
        type: Number,
        enum: [1,0],
        default: 1
    },
    created_date: {
        type: Date
    },
    update_date: {
        type: Date,
        default: Date.now()
    }
},
{ versionKey: false }
)
/*------------------------*/

/*-----Creating model-----*/
module.exports = mongoose.model('User',userSchema)
/*------------------------*/
