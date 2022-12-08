const express=require('express')
const router=express.Router()
const Habit=require('../models/habits')

// routes

// index route
router.get('/', (req, res)=>{
    res.render('habits/index.ejs')
})

router.get('/pomodoro',(req, res)=>{
    let time=1500
        function timeLeft(){
            let min=Math.floor(time/60)
            let sec=time%60 
            sec= sec <10 ? "0" +sec :sec
            time--
            return(`${min}:${sec}`)
            if(min==0 && sec==0) {clearInterval}
            let countdown=setInterval(timeLeft, 1000)
            } 
    res.render('habits/pomodoro.ejs')
})
// new route
router.get('/new', (req, res)=>{
    res.render('habits/new.ejs')
})

router.post('/', (req, res)=>{
    req.body.complete=req.body.complete==='on' ? true : false
    Habit.create(req.body, (err, createdHabit)=>{
        console.log('created', createdHabit, err)
        res.redirect('/habits')
    })
})

//export router to use in other files
module.exports=router