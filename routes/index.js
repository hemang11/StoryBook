const express  = require('express');
const router = express.Router();
const {ensureAuth , ensureGuest} = require('../middleware/auth');
// routes

// // Get /
// router.get('/',(req,res)=>{
//     res.redirect('/stories');
// })

// // Public stories
// router.get('/stories',(req,res)=>{
//     res.render('home');
// })

const Story = require('../models/Story')

// Login
router.get('/login',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login',  // by deafult the layout for hbs is set to main, here we are using login layout
    });
})

// Dashboard
router.get('/dashboard',ensureAuth, async (req,res)=>{
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
          name: req.user.firstName,
          stories,
        })
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
})

module.exports = router;