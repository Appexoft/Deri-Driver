"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("businesses_ml", {
      businessml_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      token: {
        type: Sequelize.STRING,
      },
      tokenExpiration: {
        type: Sequelize.DATE,
      },
      tokenType: {
        type: Sequelize.STRING,
      },
      scope: {
        type: Sequelize.STRING,
      },
      refreshToken: {
        type: Sequelize.STRING,
      },
      refreshTokenExpiration: {
        type: Sequelize.DATE,
      },
      clientMl: {
        type: Sequelize.STRING,
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
      BusinessId: {
        type: Sequelize.UUID,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("businesses_ml");
  },
};
