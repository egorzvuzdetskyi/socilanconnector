const express = require("express"),
    router = express.Router(),
    Post = require('../../models/Post'),
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

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const post = await newPost.save();

    res.json(post);
}));

module.exports = router;
