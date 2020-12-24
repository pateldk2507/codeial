const express = require('express');
const router = express.Router();

console.log("In api index");

router.use('/v1',require('./v1'));



module.exports = router;