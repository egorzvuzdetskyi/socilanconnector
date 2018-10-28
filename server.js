const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    db = require("./config/keys").mongoURL,
    users = require("./routes/api/users"),
    profile = require("./routes/api/profile"),
    posts = require("./routes/api/posts"),
    bodyParser = require("body-parser"),
    passport = require('passport');

//BodyParser set up
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever is running on port ${port}`));
