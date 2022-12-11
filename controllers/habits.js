const express=require('express')
const Habit=require('../models/habits')
const router=express.Router()

// routes
router.use((req, res, next)=>{
    if(req.session.loggedIn){ // req.session 
        (next) // check to see if logged in, if not redirect to the log in page
    }else{
        res.redirect('/user/login')
    }
})

router.get('/', (req, res)=>{
    // get all habits from mongodb and send them back
    Habit.find({username: req.session.username})
    .then((habits)=>{
        res.render('habits/index.ejs', {habits})
    })
    .catch(err=>console.log)
})

// index route
router.get('/', (req, res)=>{
    Habit.find()
    .then((habits)=>{
        res.render('habits/index.ejs', {habits})
    })
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


router.get('/:id/edit', (req, res)=>{
    Habit.findById(req.params.id, (err, foundHabit)=>{
        console.log(foundHabit, 'this is the habit we found')
        res.render('habits/edit.ejs', {habit:foundHabit})
    })
})

router.put('/:id', (req, res)=>{
    req.body.complete=req.body.complete==='on' ? true:false
    Habit.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, updatedHabit)=>{
        // if (updatedHabit.complete=true){
        //     updatedHabit.strike()
        // }
        console.log(updatedHabit)
        res.redirect(`/habits/${req.params.id}`)
    })
})

router.get('/:id', (req, res)=>{
    console.log(req.params.id, 'this is the parameter')
    Habit.findById(req.params.id)
    .then((habit)=>{
        res.render('habits/show.ejs', {habit})
    })
})

router.delete('/:id', (req, res)=>{
    Habit.findByIdAndDelete(req.params.id, (err, deletedHabit)=>{
        console.log(err, deletedHabit)
        res.redirect('/habits')
    })
    
})
//export router to use in other files
module.exports=router