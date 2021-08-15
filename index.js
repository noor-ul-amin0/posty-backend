require("rootpath")();
const express = require("express");
const app = express();
require("./db");
// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

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
