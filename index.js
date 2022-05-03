require("rootpath")();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes"));

app.use(function (req, res) {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || err.code || 500;
  err.succes = err.succes || false;
  res.status(err.statusCode).send({
    // succes: err.succes,
    error: err,
    msg: err.message,
  });
});
app.listen(8080, console.log("server listening on port 8080"));
// (async () => {
//   const { users, posts } = require("./utils/faker")(20, 5);
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
