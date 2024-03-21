const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  aadhar: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        const re = /^\d{12}$/;
        return value.match(re);
      },
      message: "Please enter a valid Aadhar number",
    },
  },
  phone: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "user"
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
