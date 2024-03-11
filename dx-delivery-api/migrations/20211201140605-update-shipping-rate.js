"use strict";
const moment = require("moment");
const { shippingMethods } = require("../helpers/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("shipping_rates", "date", {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("shipping_rates", "isClose", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("shipping_rates", "startAt", {
      type: Sequelize.TIME,
      defaultValue: moment().startOf("day").format(),
    });
    await queryInterface.changeColumn("shipping_rates", "finishAt", {
      type: Sequelize.TIME,
      defaultValue: moment().startOf("day").format(),
    });
    await queryInterface.addColumn("shipping_rates", "day", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("shipping_rates", "shippingMethod", {
      type: Sequelize.STRING,
      defaultValue: shippingMethods.ORDER,
    });
    await queryInterface.removeColumn("shipping_rates", "packageSize");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shipping_rates");
  },
};
