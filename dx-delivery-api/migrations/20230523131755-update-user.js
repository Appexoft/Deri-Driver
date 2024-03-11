"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE users ALTER COLUMN name DROP NOT NULL;"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE users ALTER COLUMN ci DROP NOT NULL;"
    );
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE users ALTER COLUMN name SET NOT NULL;"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE users ALTER COLUMN ci SET NOT NULL;"
    );
  },
};
