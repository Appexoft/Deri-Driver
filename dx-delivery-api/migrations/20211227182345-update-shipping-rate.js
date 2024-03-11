"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn("shipping_rates", "startAt");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shipping_rates");
  },
};
