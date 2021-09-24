const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
router.put('/comment',commentController.postComment);
router.get('/comment/:profId',commentController.getComment);
router.delete('/comment/delete/:id',commentController.deleteComment);
module.exports = router;