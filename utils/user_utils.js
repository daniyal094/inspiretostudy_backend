/* Node Imports */

/* Framework Imports */
const Joi = require("joi");

/* Local Imports */
const common_utils = require("./common_utils");
const constants = require("./constants");

filter_multiple_user_object = (users) => {
  let user_array = [];
  users.forEach((user) => {
    user_array.push({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      status : user.status
    });
  });
  return user_array;
};

filter_user_object = (user) => {
  if (!user) {
    return {};
  }
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    location: user.location,
    consistent: user.consistent,
    phone: user.phone,
    education: user.education,
    created_at: user.created_at,
    status : user.status

  };
};

/* Our users Validation */
user_validation = async (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .default(constants.USER)
      .valid(...constants.ROLES),
    location: Joi.string().required(),
    gender: Joi.string().required(),
    education: Joi.string().required(),
    Insta: Joi.string(),
    phone: Joi.string().required(),
    location: Joi.string().required(),
    consistent: Joi.boolean().required(),


  });
  return schema.validate(data);
};

user_update_validation = async (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3),
    password: Joi.string().min(6),
    role: Joi.string().valid(...constants.ROLES),
  });
  return schema.validate(data);
};

user_login_validation = async (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = {
  filter_multiple_user_object,
  filter_user_object,
  user_validation,
  user_update_validation,
  user_login_validation,
};
