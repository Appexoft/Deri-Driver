"use strict";
const db = require("../models/index");

const view_name = "riders";

const newQuery = `SELECT user_id AS rider_id, name, enrollment, ci, phone, email FROM users WHERE role = 'RIDER'`;

module.exports = {
  up: function () {
    return db.sequelize.query(`CREATE VIEW ${view_name} AS ${newQuery}`);
  },
  down: function () {
    return db.sequelize.query(`DROP VIEW ${view_name}`);
  },
};
