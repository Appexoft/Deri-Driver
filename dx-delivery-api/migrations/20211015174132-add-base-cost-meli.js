'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('shippings_ml', 'baseCostMl', {
      type: Sequelize.DECIMAL,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('shippings_ml');
  }
};
