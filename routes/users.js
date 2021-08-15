const router = require("express").Router();
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { User, Post } = require("../models");
router.post(
  "/signup",
  catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).send({ success: true, data: user });
  })
);
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const users = await User.findAll({
      include: { model: Post, attributes: { exclude: ["userId"] } },
      attributes: { exclude: ["password"] },
    });
    res.status(201).send({ success: true, data: users });
  })
);
router.route("/:userId").get(
  catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "fullName", "firstName", "lastName", "email"],
    });
    return res.send({ success: true, data: user });
  })
);
module.exports = router;
