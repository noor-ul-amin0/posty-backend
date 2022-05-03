const router = require("express").Router();
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { Post, Tag } = require("../models");
router
  .route("/")
  .post(
    catchAsync(async (req, res, next) => {
      const tag = await Tag.create(req.body);
      res.status(201).send({ success: true, data: tag });
    })
  )
  .get(
    catchAsync(async (req, res, next) => {
      const tags = await Tag.findAll({
        include: {
          model: Post,
          through: { attributes: [] },
        },
      });
      const data = [];
      for (const tag of tags) {
        data.push({ totalPosts: await tag.countPosts(), ...tag.toJSON() });
      }
      res.send({ success: true, data });
    })
  );
router
  .route("/:tagId")
  .get(
    catchAsync(async (req, res, next) => {
      const tag = await Tag.findByPk(req.params.tagId, {
        include: { model: Post },
      });
      if (tag) return res.send({ success: true, data: tag });
      next(new AppError("This tag doesnot exists!", 400));
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const tag = Tag.destroy({ where: { id: req.params.tagId } });
      if (tag) return res.sendStatus(204);
      //2. if tag doesn't exists
      next(new AppError("This tag doesnot exists!", 400));
    })
  );
module.exports = router;
