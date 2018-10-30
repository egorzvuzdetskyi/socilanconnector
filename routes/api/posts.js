const express = require("express"),
    router = express.Router(),
    Post = require('../../models/Post'),
    Profile = require('../../models/Profile'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    asyncMiddleware = require('../../middleware/asyncMiddleware'),
    validatePostInput = require('../../validation/post');

// @route       GET /api/posts/test
// @desc        Tests post route
// @access      Public
router.get("/test", (req, res) => {
    res.json({
        msg: "Posts Works!"
    });
});

// @route       GET /api/posts/
// @desc        Create post route
// @access      private
router.get("/", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const posts = await Post.getAllPosts();
    res.json(posts);

}));

// @route       GET /api/posts/:id
// @desc        Create post route
// @access      private
router.get("/:id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const post = await Post.getPostById(req.params.id);
    res.json(post);

}));

// @route       POST /api/posts/
// @desc        Create post route
// @access      private
router.post("/", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const {
            errors, isValid
        } = validatePostInput(req.body),
        newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const post = await newPost.save();

    res.json(post);
}));

// @route       DELETE /api/posts/:id
// @desc        DELETE post route
// @access      private
router.delete("/:id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const post = await Post.getPostById(req.params.id);

    if (post.user.toString() !== req.user.id) return res.status(401).json({
        notAuthorized: 'User not authorized'
    });

    post.remove();

    res.json({
        success: true
    });

}));

// @route       POST /api/posts/like/:id
// @desc        Like post
// @access      private
router.post("/like/:id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    let post = await Post.getPostById(req.params.id);

    if (post.user.toString() !== req.user.id) return res.status(401).json({
        notAuthorized: 'User not authorized'
    });

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
            alreadyLiked: 'User already liked this post'
        })
    }

    post.likes.unshift({
        user: req.user.id
    });

    post = await post.save();

    res.json(post);

}));

// @route       POST /api/posts/unlike/:id
// @desc        Unlike post
// @access      private
router.post("/unlike/:id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {
    let post = await Post.getPostById(req.params.id);

    if (post.user.toString() !== req.user.id) return res.status(401).json({
        notAuthorized: 'User not authorized'
    });

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({
            notLiked: 'User have not liked this post'
        })
    }

    const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    post = await post.save();

    res.json(post);
}));

// @route       POST /api/posts/comment/:post_id
// @desc        Add comment to the post
// @access      private
router.post("/comment/:post_id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {
    const {
            errors, isValid
        } = validatePostInput(req.body),
        newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        };

    if (!isValid) {
        return res.status(400).json(errors);
    }

    let post = await Post.getPostById(req.params.post_id);

    post.comments.unshift(newComment);

    post = await post.save();

    res.json(post);
}));

// @route       DELETE /api/posts/comment/:post_id/:comment_id
// @desc        Remove comment from post
// @access      private
router.delete("/comment/:post_id/:comment_id", passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {
    let post = await Post.getPostById(req.params.post_id);

    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({
            commentNotExist: 'Comment does not exist'
        })
    }

    const removeIndex = post.comments.map(comment => comment._id.toString())
        .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    post = await post.save();

    res.json(post);
}));

module.exports = router;
