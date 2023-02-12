/* Node Imports */

/* Framework Imports */
var express = require("express");
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var my_package_controller = require("../controller/my_package_controller");
const response_codes = require("../utils/response_codes");
const packages_utils = require("../utils/my_package_utils");

/* Middleware Imports */
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require("../middleware/request_validation");

/* GET: all packagess. */
const get_all_my_packages = async (req, res, next) => {
  const [packages, response_code, response_message] =
    await my_package_controller.read_my_packages_controller({});
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res
      .status(response_code)
      .send(common_utils.response_generator(response_code, response_message));
  }
  return res
    .status(response_code)
    .send(
      common_utils.response_generator(
        response_code,
        response_message,
        (response_data = { packages })
      )
    );
};

router.get(
  "/",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.ADMIN]),
  ],
  async (req, res, next) => {
    // get all purchased  packages
    await common_utils.api_error_handler(req, res, next, get_all_my_packages);
  }
);

/* GET: single packages in detail. */
const get_single_packages = async (req, res, next) => {
  const [packages, response_code, response_message] =
    await my_package_controller.read_my_packages_controller(req.params);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res
      .status(response_code)
      .send(common_utils.response_generator(response_code, response_message));
  }
  return res
    .status(response_code)
    .send(
      common_utils.response_generator(
        response_code,
        response_message,
        (response_data = { packages })
      )
    );
};

router.get(
  "/:id",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.USER]),
    request_validation.request_validator(
      packages_utils.my_package_update_validation
    ),
  ],
  async (req, res, next) => {
    // Send packages from database with all required fields
    await common_utils.api_error_handler(req, res, next, get_single_packages);
  }
);

/* POST: Create a packages. */
const purchase_my_packages = async (req, res, next) => {
  const [packages, response_code, response_message] =
    await my_package_controller.purchase_my_packages(req.body);
  if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
    return res
      .status(response_code)
      .send(common_utils.response_generator(response_code, response_message));
  }
  return res
    .status(response_code)
    .send(
      common_utils.response_generator(
        response_code,
        response_message,
        (response_data = { packages })
      )
    );
};

router.post(
  "/",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.USER]),
    request_validation.request_validator(packages_utils.my_package_validation),
  ],
  async (req, res, next) => {
    // Create a packages
    await common_utils.api_error_handler(req, res, next, purchase_my_packages);
  }
);

/* PUT: Update a packages. */
const change_payment_status = async (req, res, next) => {
  const [packages, response_code, response_message] =
    await my_package_controller.change_payment_status_controller(
      req.params,
      req.body
    );
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res
      .status(response_code)
      .send(common_utils.response_generator(response_code, response_message));
  }
  return res
    .status(response_code)
    .send(
      common_utils.response_generator(
        response_code,
        response_message,
        (response_data = { packages })
      )
    );
};

router.put(
  "/:id",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.ADMIN]),
    request_validation.request_validator(
      packages_utils.my_package_update_validation
    ),
  ],
  async (req, res, next) => {
    // Update a packages in database
    await common_utils.api_error_handler(req, res, next, change_payment_status);
  }
);
// Assign Link to a package
router.put(
  "/assign_link/:id",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.CONSULTANT]),
    request_validation.request_validator(
      packages_utils.my_package_update_validation
    ),
  ],
  async (req, res, next) => {
    // Update a packages in database
    await common_utils.api_error_handler(req, res, next, change_payment_status);
  }
);
/* DELETE: Delete a packages member. */
const remove_packages = async (req, res, next) => {
  const [packages, response_code, response_message] =
    await packages_controller.remove_packages_controller(req.params);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res
      .status(response_code)
      .send(common_utils.response_generator(response_code, response_message));
  }
  return res
    .status(response_code)
    .send(common_utils.response_generator(response_code, response_message));
};

router.delete(
  "/:id",
  [
    jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([constants.ADMIN]),
  ],
  async (req, res, next) => {
    // Remove a packages in database
    await common_utils.api_error_handler(req, res, next, remove_packages);
  }
);

module.exports = router;
