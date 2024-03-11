module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "isHandledByGP", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
