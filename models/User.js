const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("users", UserSchema);

User.findUserByEmail = async email => {
  return await User.findOne({
    email: email
  });
};

User.hashPassword = async passwordToHash => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(passwordToHash, salt);
};

module.exports = User;
