"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn("businesses", "UserId");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("businesses");
  },
};
