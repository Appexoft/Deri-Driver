module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("businesses", "shippingAutomaticHandling", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("businesses");
  },
};
