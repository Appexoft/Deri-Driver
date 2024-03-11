'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('shippings', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('shippings', 'type', {
      type: Sequelize.STRING,
      defaultValue: 'COMMON'
    });
    await queryInterface.addColumn('shippings', 'shippingMethod', {
      type: Sequelize.STRING,
      defaultValue: 'ORDER'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('shippings', 'name');
    await queryInterface.removeColumn('shippings', 'type');
    await queryInterface.removeColumn('shippings', 'shippingMethod');
  }
};
