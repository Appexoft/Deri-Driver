"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("parameters", {
      parameter_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      key: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("parameters");
  },
};
