const express = require('express');
const router = express.Router();

const postsController = require('../controller/PostsController')


router.get('/postByID', postsController.postByID)

router.get('/:parent/:type/:slug', postsController.postDetailFull)
router.get('/:parent/:slug', postsController.postsForTypeFull)
router.get('/full', postsController.fullPosts)

router.delete('/:slug', postsController.deletePost)
router.put('/:slug', postsController.updatePost)
router.post('/store', postsController.storePost);

router.get('/:type/:slug', postsController.postDetail);
router.get('/:slug', postsController.postsForType);
router.get('/', postsController.index);



module.exports = router;