const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(             //this is object/instance of mongoose
    {
        user_name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        first_name: {
            type: String,
            required: true,
            unique: false,
            trim: true,
        },
        middle_name: {
            type: String,
            required: false,
            unique:false,
            trim: true
        },
        last_name: {
            type: String,
            required: false,
            unique:false,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        is_deleted: {
            type: Number,
            enum: [0, 1],
            default: 0
        },
        password: {
            type: String,
            required: true,
            trim: true
        }   
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports =  new mongoose.model("Users", userSchema)
