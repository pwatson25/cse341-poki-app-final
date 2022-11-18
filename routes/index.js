const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const router = express.Router();
// const schema = require('./schema');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/Dashboard', ensureAuth, (req, res) => {
  console.log(req.user);
  res.render('dashboard', {
    name: req.user.firstName,
  });
});

// router.use('/graphql', schema);

module.exports = router;
