"use strict";
const { v4: uuidv4 } = require("uuid");
const model = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const shipping = await model.Shipping.findOne({ raw: true });
    return queryInterface.bulkInsert(
      "shipping_images",
      [
        {
          shipping_image_id: uuidv4(),
          uri: "https://gestionpost.s3.us-east-2.amazonaws.com/80FA389B-7FD4-4070-A06D-73C8F52DFDFD.jpg",
          ShippingId: shipping.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("shipping_images", null, {});
  },
};
