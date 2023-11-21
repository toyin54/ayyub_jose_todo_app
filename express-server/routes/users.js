var express = require('express');
var router = express.Router();


const User = require('../models/User');

router.get('/', async function(req, res, next) {
  try {
    const users = await User.find().exec();
    //res.json(users);
    return res.status(200).json({ users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

