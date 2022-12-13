// import
require('dotenv').config()
const express=require('express')
const morgan=require('morgan')
const methodOverride=require('method-override')
const PORT=process.env.PORT || 5678
const HabitRouter=require('./controllers/habits')
const UserRouter=require('./controllers/user')
const session=require('express-session') // gives session cookies
const MongoStore=require('connect-mongo') // reads the session and connect to 
//establish mong connection


const app=express()

app.use(morgan('dev'))
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET, 
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true, 
    resave: false
}))

app.use('/habits', HabitRouter)
app.use('/user', UserRouter)


app.get("/", (req, res) => {
    res.redirect("/habits")
}) 

// start the server(listener)
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})