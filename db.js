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
    // (async () => {
    //   const { users, posts } = require("./utils/faker")(20, 150);
    //   const sequelize = require("./db");
    //   const { Post, User } = require("./models");
    //   const transaction = await sequelize.transaction();
    //   try {
    //     await User.bulkCreate(users, { validate: true, transaction });
    //     await Post.bulkCreate(posts, { validate: true, transaction });
    //     console.log("DONE");
    //     await transaction.commit();
    //   } catch (error) {
    //     await transaction.rollback();
    //     console.log(error);
    //   }
    // })();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
dbConnection();
module.exports = sequelize;
