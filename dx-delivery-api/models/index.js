"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    timezone: "America/Montevideo",
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 60000,
    },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
