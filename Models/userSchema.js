//import mongoose
const mongoose = require('mongoose')

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

//create Model
//momgoose.model() method is used to create model,it accepts two arguments.
//1. Name of the collection that needs to mao with this model.
//2. The schema created.
const users = mongoose.model('users',userSchema)

//Export the model
module.exports = users