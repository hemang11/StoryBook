const express  = require('express');
const router = express.Router();
const {ensureAuth , ensureGuest} = require('../middleware/auth');
// routes

// Get /
router.get('/',(req,res)=>{
    res.redirect('/stories');
})

// Public stories
router.get('/stories',(req,res)=>{
    res.render('home');
})

// Login
router.get('/login',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login',  // by deafult the layout for hbs is set to main, here we are using login layout
    });
})

// Dashboard
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard',{user:req.user});
})

module.exports = router;