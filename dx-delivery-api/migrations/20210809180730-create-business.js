"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("businesses", {
      business_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      rut: {
        type: Sequelize.STRING,
      },
      businessName: {
        type: Sequelize.STRING,
      },
      CompanyId: {
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
      UserId: {
        type: Sequelize.UUID,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("businesses");
  },
};
