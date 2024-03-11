"use strict";

const { v4: uuidv4 } = require("uuid");
const { shippingType, shippingState, shippingMethods } = require("../helpers/constants");
const { Business, DeliveryZone, User, sequelize } = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const business = await Business.findOne({ raw: true });
    const deliveryZone = await DeliveryZone.findOne({ raw: true });
    const user = await User.findOne({});

    return queryInterface.bulkInsert(
      "shippings",
      [
        {
          shipping_id: uuidv4(),
          type: shippingType.COMMON,
          state: shippingState.TO_ASSIGN,
          client: "John Doe",
          clientDni: "52789742",
          phone: "094765432",
          originStreet: "23 de Febrero",
          originCity: "8 de octubre",
          originNumber: "6893",
          originFloor: "Ap 4",
          originPostalCode: "11600",
          originLocation: sequelize.fn(
            "ST_GeomFromText",
            "POINT(50.871962 4.287370999999999)"
          ),
          destinyStreet: "Plaza independencia",
          destinyCity: "Colonia",
          destinyNumber: "10500",
          destinyFloor: "Puerta Roja",
          destinyPostalCode: "11300",
          destinyLocation: sequelize.fn(
            "ST_GeomFromText",
            "POINT(50.871962 4.287370999999999)"
          ),
          comments: "Acerca del estado",
          details: "Un envío de prueba",
          shippingMethod:shippingMethods.ORDER,
          ClientId: user.id,
          RiderId: user.id,
          BusinessId: business.id,
          DeliveryZoneId: deliveryZone.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("shippings", null, {});
  },
};
