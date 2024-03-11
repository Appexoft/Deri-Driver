'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('shippings', 'originNumber', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('shippings', 'destinyNumber', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('shippings');
  }
};
