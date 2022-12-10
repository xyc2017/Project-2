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

router.post('/signup', (req, res)=>{
    req.body.password=await
    bcrypt.hash(req.body.password, await bcrypt.genSalt(10)) 
    // 10 degrees of difficulties
    // bcrypt, genSalt asynt, Hashing is a one-way process that converts a password to ciphertext using hash algorithms, alting adds random characters before or after a password prior to hasing to obscure the actual password.
    User.create(req.body, (err, user)=>{
        res.redirect('/user/login')
    })
})