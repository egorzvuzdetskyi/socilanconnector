const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Profile = require('../../models/Profile'),
    User = require('../../models/User'),
    asyncMiddleware = require('../../middleware/asyncMiddleware'),
    validateProfileInput = require('../../validation/profile'),
    validateExperienceInput = require('../../validation/experience');
    validateEducationInput = require('../../validation/education');

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
router.get('/', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {
    const profile = await Profile.getUserProfileById(req.user.id),
        errors = {};

    if (!profile) {
        errors.profile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }

    res.json(profile);
}));

// @route       POST /api/profile
// @desc        Create users profile
// @access      Private
router.post('/', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {
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
        {
            errors,
            isValid
        } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    profileFields.user = req.user.id;

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (typeof skills !== 'undefined') {
        profileFields.skills = skills.split(',');
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    const profile = await Profile.getUserProfileById(req.user.id);

    if (!profile) {
        const newProfile = await Profile.createNewProfile(profileFields);
        if (newProfile.errors) {
            errors.handle = newProfile.errors.handle;
            return res.status(400).json(errors);
        }

        return res.json(newProfile.profile);
    }

    const newProfile = await Profile.updateProfile(req.user.id, profileFields);
    return res.json(newProfile);
}));

// @route       GET /api/handle/:handle
// @desc        Get profile by handle
// @access      Public
router.get('/handle/:handle', asyncMiddleware(async (req, res) => {
    const {
            handle
        } = req.params,
        profile = await Profile.getUserProfileByHandle(handle),
        errors = {};

    if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }

    res.json(profile);
}));

// @route       GET /api/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', asyncMiddleware(async (req, res) => {
    const {
            user_id
        } = req.params,
        profile = await Profile.getUserProfileById(user_id),
        errors = {};

    if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }

    res.json(profile);
}));

// @route       GET /api/profile/all
// @desc        Get all profiles
// @access      Public
router.get('/all', asyncMiddleware(async (req, res) => {
    const profiles = await Profile.getAll(),
        errors = {};

    if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
    }

    return res.json(profiles);
}));

// @route       POST /api/profile/experience
// @desc        Add experience to profile
// @access      Private
router.post('/experience', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const {
            errors, isValid
        } = validateExperienceInput(req.body),
        newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let profile = await Profile.getUserProfileById(req.user.id);

    profile.experience.unshift(newExp);

    profile = await profile.save();

    res.json(profile);

}));

// @route       POST /api/profile/education
// @desc        Add education to profile
// @access      Private
router.post('/education', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    const {
            errors, isValid
        } = validateEducationInput(req.body),
        newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let profile = await Profile.getUserProfileById(req.user.id);

    profile.education.unshift(newEdu);

    profile = await profile.save();

    res.json(profile);

}));

// @route       DELETE /api/profile/experience/:exp_id
// @desc        Delete experience from profile
// @access      Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    let profile = await Profile.getUserProfileById(req.user.id);

    const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    profile = await profile.save();

    res.json(profile);

}));

// @route       DELETE /api/profile/education/:edu_id
// @desc        Delete education from profile
// @access      Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    let profile = await Profile.getUserProfileById(req.user.id);

    const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);

    profile = await profile.save();

    res.json(profile);

}));

// @route       DELETE /api/profile/
// @desc        Delete user and profile
// @access      Private
router.delete('/', passport.authenticate('jwt', {session: false}), asyncMiddleware(async (req, res) => {

    Profile.deleteProfileAndUser(req.user.id)
        .then(() => {
            res.json({
                success: true
            })
        });

}));

module.exports = router;
