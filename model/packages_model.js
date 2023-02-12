/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */

const packages_model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  full_description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  promotion: {
    type: String,
  },
  serviceterms: {
    type: String,
  },
  frequency: {
    type: String,
    required: true,
  },
  groupSize: {
    type: Number,
    required: true,
    default: 0,
  },
  freeResources: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("packages", packages_model);
