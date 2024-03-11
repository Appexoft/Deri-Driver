const { check } = require("express-validator");

const newShipping = [
  check("name").not().isEmpty().withMessage("El campo nombre es requerido"),
  check("phone").not().isEmpty().withMessage("El campo teléfono es requerido"),
  check("details")
    .isString()
    .withMessage("El campo detalles no es string")
    .isLength({ max: 280 })
    .withMessage("El campo detalles debe tener como máximo 280 caracteres"),
];

const deleteMultipleShippingsById = [
  check("shippingSelectedById")
    .not()
    .isEmpty()
    .withMessage("El campo es requerido")
    .isArray()
    .withMessage("El campo debe ser un array"),
];

module.exports = {
  newShipping,
  deleteMultipleShippingsById,
};
