"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE EXTENSION postgis;");
  },
  down: async (queryInterface) => {
  
  },
};
