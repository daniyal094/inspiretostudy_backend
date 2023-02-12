/* Node Imports */

/* Framework Imports */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Local Imports */
const constants = require("../utils/constants");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    default: constants.ROLES[0],
    enum: constants.ROLES,
  },
  education: {
    type: String,
    required: true,
  },
  Insta: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  consistent: { type: Boolean, required: true, default: false },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
