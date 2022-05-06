require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.use(function (req, res) {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || err.code || 500;
  err.success = err.success || false;
  res.status(err.statusCode).send({
    error: err,
    msg: err.message,
  });
});
app.listen(8080, console.log("server listening on port 8080"));
