const { Sequelize } = require("sequelize");

let sequelize;
async function dbConnection() {
  try {
    sequelize = new Sequelize("sequelize_db", "root", "", {
      host: "localhost",
      dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    });
    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully to ${sequelize.options.host}.`
    );
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
dbConnection();
module.exports = sequelize;
