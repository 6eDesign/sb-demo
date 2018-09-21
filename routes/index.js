var express = require('express')
  , router = module.exports = express.Router();

router.get('/', (req,res) => res.render('home'));