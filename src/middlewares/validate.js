const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  let data = { ...req.body };
  if (Object.keys(data).length > 0) {
    for (let key in data) {
      try {
        data[key] = JSON.parse(data[key]);
      } catch (error) {
        continue;
      }
    }
  }
  data = JSON.parse(JSON.stringify(data));
  req.body = data;
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
