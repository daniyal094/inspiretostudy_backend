/* Node Imports */

/* Framework Imports */

/* Local Imports */
var packages_model = require("../model/packages_model");
var packages_utils = require("../utils/packages_utils");
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");

const read_packages_controller = async (filter_body) => {
  if (common_utils.object_is_empty(filter_body)) {
    const packages = await packages_model.find({ status: true });

    return [
      packages_utils.filter_multiple_package_object(packages),
      response_codes.CODE_RESPONSE_SUCCESS,
      response_codes.MESSAGE_RESPONSE_SUCCESS,
    ];
  }
  if (!common_utils.validate_id(filter_body.id))
    return [
      null,
      response_codes.CODE_BAD_REQUEST,
      response_codes.MESSAGE_INVALID_PARAMETERS + "id",
    ];

  const packages = await packages_model.findOne({
    _id: filter_body.id,
    status: true,
  });

  return [
    packages_utils.filter_package_object(packages),
    response_codes.CODE_RESPONSE_SUCCESS,
    response_codes.MESSAGE_RESPONSE_SUCCESS,
  ];
};

const create_packages_controller = async (filter_body) => {
  const packages = new packages_model(filter_body);

  return await packages
    .save()
    .then(() => {
      return [
        packages_utils.filter_package_object(packages),
        response_codes.CODE_RESPONSE_CREATION_SUCCESS,
        response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS,
      ];
    })
    .catch((err) => {
      return [
        null,
        response_codes.CODE_INTERNAL_SERVER_ERROR,
        response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR,
      ];
    });
};

const edit_packages_controller = async (filter_params, filter_body) => {
  if (!filter_params.id)
    return [
      null,
      response_codes.CODE_BAD_REQUEST,
      response_codes.MESSAGE_MISSING_PARAMETERS + "id",
    ];

  if (!common_utils.validate_id(filter_params.id))
    return [
      null,
      response_codes.CODE_BAD_REQUEST,
      response_codes.MESSAGE_INVALID_PARAMETERS + "id",
    ];

  const packages = await packages_model.findOneAndUpdate(
    { _id: filter_params.id },
    filter_body,
    { returnDocument: "after" }
  );

  return [
    packages_utils.filter_package_object(packages),
    response_codes.CODE_RESPONSE_SUCCESS,
    response_codes.MESSAGE_RESPONSE_SUCCESS,
  ];
};

const remove_packages_controller = async (filter_body) => {
  if (!common_utils.validate_id(filter_body.id))
    return [
      null,
      response_codes.CODE_BAD_REQUEST,
      response_codes.MESSAGE_INVALID_PARAMETERS + "id",
    ];

  const packages = await packages_model.findOneAndUpdate(
    { _id: filter_body.id },
    { status: false },
    { returnDocument: "after" }
  );

  return [
    packages_utils.filter_package_object(packages),
    response_codes.CODE_RESPONSE_SUCCESS,
    response_codes.MESSAGE_RESPONSE_SUCCESS,
  ];
};

module.exports = {
  read_packages_controller,
  create_packages_controller,
  edit_packages_controller,
  remove_packages_controller,
};
