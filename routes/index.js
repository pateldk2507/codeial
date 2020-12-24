const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

router.get('/',homeController.home);

router.use('/user',require('./users'));
router.use('/posts', require('./post'));
router.use('/comments',require('./comment'));

//APIS
router.use('/api',require('./api'));

router.use('/likes',require('./likes'));


module.exports = router;