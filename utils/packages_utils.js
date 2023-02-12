/* Node Imports */

/* Framework Imports */
const Joi = require("joi");

/* Local Imports */
const common_utils = require("./common_utils");

filter_multiple_package_object = (packages) => {
  let package_array = [];
  packages.forEach((package) => {
    package_array.push({
      id: package._id,
      name: package.name,
      full_description: package.full_description,
      teacher: package.teacher,
      price: package.price,
      promotion: package.promotion,
      serviceterms: package.serviceterms,
      frequency: package.frequency,
      groupSize: package.groupSize,
      freeResources: package.freeResources,
      status : package.status
    });
  });
  return package_array;
};

filter_package_object = (package) => {
  if (!package) {
    return {};
  }
  return {
    id: package._id,
    name: package.name,
    full_description: package.full_description,
    teacher: package.teacher,
    price: package.price,
    promotion: package.promotion,
    serviceterms: package.serviceterms,
    frequency: package.frequency,
    groupSize: package.groupSize,
    freeResources: package.freeResources,
    status: package.status,
  };
};

/* Our packages Validation */
package_validation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    full_description: Joi.string().required(),
    teacher: Joi.string().required(),
    price: Joi.number().required(),
    promotion: Joi.string(),
    serviceterms: Joi.string(),
    frequency: Joi.string().required(),
    groupSize: Joi.number().required(),
    freeResources: Joi.string(),
    status: Joi.boolean(),

  });
  return schema.validate(data);
};

package_update_validation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    short_description: Joi.string().max(100),
    full_description: Joi.string(),
    titled_image: Joi.string().uri(),
    gallery: Joi.array().items(Joi.string().uri()).min(1),
    banner_video: Joi.string().uri(),
    rating: Joi.number().min(0).default(0),
  });
  return schema.validate(data);
};

module.exports = {
  filter_multiple_package_object,
  filter_package_object,
  package_validation,
  package_update_validation,
};
