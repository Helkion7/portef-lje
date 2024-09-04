const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogController.blog_create_get);
router.post('/create', blogController.blog_create_post);
router.get('/', blogController.blog_index);
router.get('/blogs', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/blogs/:id', blogController.blog_details);
router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;