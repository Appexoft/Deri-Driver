"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("branches", {
      branch_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      streetName: {
        type: Sequelize.STRING,
      },
      streetFloor: {
        type: Sequelize.STRING,
      },
      streetNumber: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.GEOMETRY("POINT"),
      },
      serviceHours: {
        type: Sequelize.TEXT,
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("branches");
  },
};
