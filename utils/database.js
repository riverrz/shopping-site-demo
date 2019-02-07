const Sequelize = require("sequelize");

const sequelize = new Sequelize("shopping_site", "root", "qwQW12!@", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
