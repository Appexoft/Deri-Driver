"use strict";
const { v4: uuidv4 } = require("uuid");
const { shippingType, shippingMethods } = require("../helpers/constants");
const model = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const deliveryZone = await model.DeliveryZone.findOne({});
    return queryInterface.bulkInsert(
      "shipping_rates",
      [
        //Montevideo
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.EXPRESS,
          // finishAt: new Date(),
          // date: new Date(),
          price: 160,
          isClose: false,
          day: "Monday",
          DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.COMMON,
          // finishAt: new Date(),
          // date: new Date(),
          price: 120,
          isClose: false,
          day: "Monday",
          DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.PICK_UP,
          // finishAt: new Date(),
          // date: new Date(),
          price: 55,
          isClose: false,
          day: "Monday",
          // DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Canelones
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.EXPRESS,
          // finishAt: new Date(),
          // date: new Date(),
          price: 200,
          isClose: false,
          day: "Monday",
          DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.COMMON,
          // finishAt: new Date(),
          // date: new Date(),
          price: 180,
          isClose: false,
          day: "Monday",
          DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          shipping_rate_id: uuidv4(),
          typeOfShipping: shippingType.PICK_UP,
          // finishAt: new Date(),
          // date: new Date(),
          price: 99,
          isClose: false,
          day: "Monday",
          // DestinyZoneId: deliveryZone?.id,
          OriginZoneId: deliveryZone?.id,
          shippingMethod: shippingMethods.ORDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("shipping_rates", null, {});
  },
};
