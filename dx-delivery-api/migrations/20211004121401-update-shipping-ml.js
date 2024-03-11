'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('shippings_ml', 'idMl', {
      type: Sequelize.BIGINT,
      unique: true,
    });
    await queryInterface.addColumn('shippings_ml', 'deliveryTypeMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'estimatedDeliveryMl', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('shippings_ml', 'estimatedDeliveryLimitMl', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('shippings_ml', 'shippingMethodMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'logisticTypeMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'statusMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'subStatusMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'siteMl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('shippings_ml', 'modeMl', {
      type: Sequelize.STRING,
    }).then(() => {
      return queryInterface.addIndex('shippings_ml', ['idMl'])
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('shippings_ml');
  }
};
