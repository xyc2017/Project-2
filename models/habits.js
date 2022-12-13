// habits model
const mongoose=require('./connection')

const {Schema, model}=mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model

const habitsSchema=new Schema({
    name: String,
    type: String,
    startDate: Date,
    targetDate: Date,
    complete: Boolean,
    notes: String,
    counter: String,
    username: String,
    checkIn: Number

}) 

const Habit=model('Habit', habitsSchema) // inside model, create habit, collect and use the habitSchema

module.exports=Habit