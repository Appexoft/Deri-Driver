module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("postal_codes_delivery_zones", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      PostalCodeId: {
        type: Sequelize.UUID,
      },
      DeliveryZoneId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("postal_codes_delivery_zones");
  },
};
