"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn("shippings", "dateOfDelivery");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
