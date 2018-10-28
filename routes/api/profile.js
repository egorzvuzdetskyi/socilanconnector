const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Profile = require('../../models/Profile'),
    User = require('../../models/User'),
    asyncMiddleware = require('../../middleware/asyncMiddleware');

// @route       GET /api/profile/test
// @desc        Tests users route
// @access      Public
router.get("/test", (req, res) => {
    res.json({
        msg: "Profile Works!"
    });
});

// @route       GET /api/profile
// @desc        Get current users profile
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false }), asyncMiddleware(async (req, res) => {
    const profile = await Profile.getUserProfileById(req.user.id),
        errors = {};

    if(!profile) {
        errors.profile = 'There is no profile for this user';
        res.status(404).json(errors);
    }

    res.json(profile);
}));

module.exports = router;
