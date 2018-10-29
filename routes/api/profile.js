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

// @route       POST /api/profile
// @desc        Create users profile
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false }), asyncMiddleware(async (req, res) => {
    const profileFields = {},
        {
            handle,
            website,
            company,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            linkedin,
            instagram,
            twitter
        } = req.body,
        errors = {};
    profileFields.user = req.user.id;

    if(handle) profileFields.handle = handle;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubUsername) profileFields.githubUsername = githubUsername;
    if(typeof skills !== 'undefined') {
        profileFields.skills = skills.split(',');
    }
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    if(twitter) profileFields.social.twitter = twitter;

    const profile = await Profile.getUserProfileById(req.user.id);

    if(!profile) {
        const newProfile = await Profile.createNewProfile(profileFields);
        if(newProfile.errors) {
            errors.handle = newProfile.errors.handle;
            res.status(400).json(errors);
        }

        return res.json(newProfile.profile);
    }

    const newProfile = await Profile.updateProfile(req.user.id, profileFields);
    return res.json(newProfile.profile);
}));

module.exports = router;
