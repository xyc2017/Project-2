// import
require('dotenv').config()
const express=require('express')
const morgan=require('morgan')
const methodOverride=require('method-override')
const mongoose=require('mongoose')
const HabitRouter=require('./controllers/habits')
const PORT=process.env.PORT || 5678
//create express app
const app=express()
//establish mong connection
mongoose.connect(process.env.DATABASE_URL)
// mongoose connection events
// mongoose.connection
// .on('open', ()=>{console.log("connected to mongo")})
// .on('close', ()=>{console.log("disconnected to mongo")})
// .on('error', (error)=>{console.log(error)})
//register middleware
app.use(morgan('dev'))
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/habits', HabitRouter)

// app.get('/', (req, res)=>{
//     res.render('index.ejs')
// })

// app.get('/', (req, res)=>{
//     res.send('<h1>Server is working</h1>')
// })

// start the server(listener)
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})