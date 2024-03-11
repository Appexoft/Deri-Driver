const { validationResult } = require("express-validator");

const errorValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    ...errors,
  });
};

module.exports = {
  errorValidator,
};
