const express=require('express')
const User=require('../models/user')
const bcrypt=require('bcryptjs')

// create route
const router=express.Router()

// routes
// the signup routes (get => form, post => submit form)
router.get('/signup', (req, res)=>{
    res.render('user/signup.ejs')
})

router.post('/signup', async (req, res)=>{
    req.body.password=await
    bcrypt.hash(req.body.password, await bcrypt.genSalt(10)) 
    // 10 degrees of difficulties
    // bcrypt, genSalt asynt, Hashing is a one-way process that converts a password to ciphertext using hash algorithms, alting adds random characters before or after a password prior to hasing to obscure the actual password.
    User.create(req.body, (err, user)=>{
        res.redirect('/user/login')
    })
})

// login routes
router.get('/login', (req, res)=>{
    res.render('user/login.ejs')
})

router.post('/login', (req, res)=>{
    const {username, password}=req.body
    // equivalent to req.body.username, req.body.password
    User.findOne({username}, (err, user)=>{
        if(!user){
            res.send('User does not exist')
        }else{
            const result=bcrypt.compareSync(password, user.password)
            if(result){
                req.session.username=username
                req.session.loggedIn=true
                res.redirect('/habits')
            }else{
                res.send('Incorrect password')
            }
        
        }
    })
})

router.get('/logout', (req, res)=>{
    // log out button
    req.session.destroy((err)=>{ // destroy session and redirect to home page
        res.redirect('/')
    })
})

module.exports=router