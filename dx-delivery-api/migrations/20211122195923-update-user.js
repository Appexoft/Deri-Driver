module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn("users", "nickName");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
