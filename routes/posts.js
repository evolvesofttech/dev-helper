const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load input validations
const validatePostInput = require('../validation/post');

//Load post model
const Post = require('../models/Post');

//Test route
router.get('/test', (req, res) => {
    res.send({name:'Hello from Post'});
});

//@Route    GET /api/posts
//@Desc     Get posts
//@Access   Public
router.get('/', (req, res) => {
    Post.find()
        .populate('user', ['name'])
        .populate('category', ['name'])
        .sort({ date:-1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ notfound: 'Posts not found.'}));
});//Get posts ends

//@Route    POST /api/posts
//@Desc     Create Post
//@Access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const newPost = new Post({
        title:req.body.title,
        body:req.body.body,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        comments:req.body.comments,
        likes:req.body.likes,
        user:req.user.id,
        category:req.body.category
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
});//post ends

//@Route    PUT /api/posts/:post_id
//@Desc     Update Post
//@Access   Private
router.put('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        _id:req.params.post_id,
        title:req.body.title,
        body:req.body.body,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        comments:req.body.comments,
        likes:req.body.likes,
        user:req.user.id,
        category:req.body.category
    });

    Post.updateOne({ _id:req.params.post_id }, newPost)
        .then(post => {
            res.status(200).json({ message:'Post update successfully.'});
        }).catch(err => res.status(400).json(err));
});//put post ends

//@Route    DELETE /api/posts/:id
//@Desc     Delete post
//@Access   Private
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findByIdAndRemove(req.params.post_id)
        .then(() => {
            res.status(200).json({ message: 'Post deleted successfully!' });
        }).catch(err => res.status(400).json(err));
});//delete ends

module.exports = router;