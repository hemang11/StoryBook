const express  = require('express');
const router = express.Router();
const passport = require('passport');

// Auth routes

/* /auth/google */
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

// callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
  
// Logout
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/stories');
})

module.exports = router;