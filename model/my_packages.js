/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */

const my_packages_model = new mongoose.Schema({
  user_id: {
    type: String,
  },
  username: {
    type: String,
  },
  package_id: {
    type: String,
  },
  package_name: {
    type: String,
  },
  consultant_id: {
    type: String,
  },
  consultant_name: {
    type: String,
  },
  link: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentCode: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("my_packages", my_packages_model);
