//database connection
require('dotenv').config() //load env variables
const mongoose=require('mongoose') // data connections

const DATABASE_URL=process.env.DATABASE_URL
const CONFIG={
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
 
//establish our connections
mongoose.connect(DATABASE_URL, CONFIG)

//log connections events from mongoose
mongoose.connection 
.on("open", ()=>console.log("mongoose connected"))
.on("close", ()=> console.log('Disconnected from Mongoose'))
.on("error", (error)=> console.log('Mongoose error', error))

//export ongoose with connection to use in other files
module.exports=mongoose