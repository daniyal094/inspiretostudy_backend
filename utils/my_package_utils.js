/* Node Imports */

/* Framework Imports */
const Joi = require("joi");

filter_multiple_my_package_object = (packages) => {
  let package_array = [];
  packages.forEach((package) => {
    package_array.push({
      id: package._id,
      user_id: package.user_id,
      username: package.username,
      package_id: package.package_id,
      package_id: package.package_id,
      package_name: package.package_name,
      consultant_id: package.consultant_id,
      consultant_name : package.consultant_name,
      link: package.link,
      complete: package.complete,
      remarks: package.remarks,
      isPaid: package.isPaid,
      paymentCode: package.paymentCode,
      status: package.status,
    });
  });
  return package_array;
};

filter_my_package_object = (package) => {
  if (!package) {
    return {};
  }
  return {
    id: package._id,
    user_id: package.user_id,
    username: package.username,
    package_id: package.package_id,
    package_name: package.package_name,
    consultant_id: package.consultant_id,
    consultant_name: package.consultant_name,
    link: package.link,
    complete: package.complete,
    remarks: package.remarks,
    isPaid: package.isPaid,
    paymentCode: package.paymentCode,
    status: package.status,
  };
};

/* Our packages Validation */
my_package_validation = async (data) => {
  const schema = Joi.object({
    id: Joi.string(),
    user_id: Joi.string(),
    username: Joi.string(),
    consultant_name: Joi.string(),
    package_name: Joi.string(),
    package_id: Joi.string(),
    consultant_id: Joi.string(),
    link: Joi.string(),
    complete: Joi.boolean(),
    remarks: Joi.string(),
    isPaid: Joi.boolean(),
    paymentCode: Joi.string(),
    status: Joi.boolean(),
  });
  return schema.validate(data);
};

my_package_update_validation = async (data) => {
  const schema = Joi.object({
    id: Joi.string(),
    user_id: Joi.string(),
    package_id: Joi.string(),
    consultant_id: Joi.string(),
    consultant_name: Joi.string(),
    username: Joi.string(),
    package_name: Joi.string(),
    link: Joi.string(),
    complete: Joi.boolean(),
    remarks: Joi.string(),
    isPaid: Joi.boolean(),
    paymentCode: Joi.string(),
    status: Joi.boolean(),
  });
  return schema.validate(data);
};

module.exports = {
  filter_multiple_my_package_object,
  filter_my_package_object,
  my_package_validation,
  my_package_update_validation,
};
