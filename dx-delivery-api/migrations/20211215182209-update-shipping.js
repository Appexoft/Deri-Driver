module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "price", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("shippings", "dateOfDelivery", {
      type: Sequelize.DATEONLY,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
