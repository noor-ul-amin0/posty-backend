const router = require("express").Router();
const Sequelize = require("sequelize");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { User, Post } = require("../models");
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).send({ success: true, data: user });
  })
);
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const users = await User.findAll({
      include: { model: Post },
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("posts.userId")), "totalPosts"],
        ],
        exclude: ["password"],
      },
      group: ["posts.userId"],
    });

    res.status(201).send({ success: true, result: users.length, data: users });
  })
);
router
  .route("/:userId")
  .get(
    catchAsync(async (req, res, next) => {
      const user = await User.findByPk(req.params.userId, {
        attributes: {
          include: [
            [
              Sequelize.fn("COUNT", Sequelize.col("posts.userId")),
              "totalPosts",
            ],
          ],
          exclude: ["password"],
        },
        group: ["posts.userId"],
      });
      return res.send({ success: true, data: user });
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const user = await User.destroy({
        where: { id: req.params.userId },
      });
      return res.send({ success: true, data: user });
    })
  );
module.exports = router;
