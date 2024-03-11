'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('shippings', 'limitDate', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('shippings', 'startDate', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('shippings');
  }
};
