const express = require("express"),
    router = express.Router(),
    User = require("../../models/User"),
    gravatar = require("gravatar"),
    asyncMiddleware = require("../../middleware/asyncMiddleware"),
    bcrypt = require('bcryptjs'),
    JsonWebToken = require('../../helpers/JsonWebTokenClass'),
    passport = require('passport'),
    validateRegisterUser = require('../../validation/register'),
    validateLoginUser = require('../../validation/login');

// @route       POST /api/users/register
// @desc        Register users route
// @access      Public
router.post("/register", asyncMiddleware(async (req, res) => {
        const {email, password, name, password2} = req.body;

        const {
            errors,
            isValid
        } = validateRegisterUser({
            email,
            password,
            password2,
            name
        });

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const user = await User.findUserByEmail(email);

        if (user) {
            errors.email = "Email already exist";
            return res.status(404).json(errors);
        }

        const avatar = gravatar.url(email, {
            s: "200", // size
            r: "pg", // rating
            d: "mm" //default
        });

        const newUser = new User({
            name,
            email,
            avatar,
            password
        });

        newUser.password = await User.hashPassword(password);

        await newUser.save();

        res.json(newUser);
    })
);

// @route       POST /api/users/login
// @desc        Login users route
// @access      Public
router.post('/login', asyncMiddleware(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const {
        errors,
        isValid
    } = validateLoginUser({
        email,
        password
    });

    if (!isValid) return res.status(400).json(errors);

    const user = await User.findUserByEmail(email);

    if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        errors.password = 'Password incorrect';
        res.status(400).json(errors);
    }

    const payload = {
        email: user.email,
        id: user.id,
        name: user.name,
        avatar: user.avatar
    };

    const token = await JsonWebToken.getToken(payload);

    res.json({
        success: true,
        token: 'Bearer ' + token
    });

}));

// @route       POST /api/users/current
// @desc        Return current user
// @access      Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json(
        {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
    );
})

module.exports = router;
