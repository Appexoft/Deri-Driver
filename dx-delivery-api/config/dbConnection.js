const db = require("../models/index");

const dbConnection = async () => {
  try {
    // eslint-disable-next-line no-undef
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dbConnection };
