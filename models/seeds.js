require('dotenv').config()
const mongoose=require('./connection')
const Habit=require('./habits')

mongoose.connection.on('open',()=>{
    const startingHabit=[
        
    ]

    Habit.deleteMany({}, (err, data)=>{
        Habit.create(startingHabit, (err, data)=>{
    console.log(data)
    mongoose.connection.close()
})
    })
})