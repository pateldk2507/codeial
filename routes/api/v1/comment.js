const express = require('express');
const router = express.Router();
const commentApi = require('../../../controllers/api/v1/comment_api');


//:id is post id
router.get('/:id',commentApi.getAll);



module.exports = router;