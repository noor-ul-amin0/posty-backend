const router = require("express").Router();
const Sequelize = require("sequelize");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { Post, User, Tag } = require("../models");
router
  .route("/")
  .post(
    catchAsync(async (req, res, next) => {
      const post = await Post.create(req.body);
      res.status(201).send({ success: true, data: post });
    })
  )
  .get(
    catchAsync(async (req, res, next) => {
      // the only problem with this query is that it returns only 1 associated tag instead of all
      const posts = await Post.findAll({
        // where clauses at the top-level
        // where: {
        //   "$Tags.name$": { [Op.eq]: "Action" },
        // },
        // include: [
        //   {
        //     attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        //     model: User,
        //     as: "author",
        //   },
        //   {
        //     model: Tag,
        //     through: { attributes: [] },
        //   },
        // ],
        // group: ["Post.id"],
        // // includeIgnoreAttributes: false,
        // attributes: {
        //   include: [
        //     [Sequelize.fn("COUNT", Sequelize.col("tags.id")), "totalTags"],
        //   ],
        // },
        // order: [[Sequelize.fn("COUNT", Sequelize.col("tags.id")), "DESC"]],
        include: [
          {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            model: User,
            as: "author",
          },
          {
            model: Tag,
            through: { attributes: [] },
          },
        ],
        // Fetch all models associated with User and their nested associations (recursively)
        // include: { all: true, nested: true },
      });
      res.send({ success: true, result: posts.length, data: posts });
    })
  );
router
  .route("/:postId")
  .get(
    catchAsync(async (req, res, next) => {
      const post = await Post.findByPk(req.params.postId);
      if (post) return res.send({ success: true, data: post });
      next(new AppError("This Post doesnot exists!", 400));
    })
  )
  .post(
    catchAsync(async (req, res, next) => {
      const post = await Post.create(req.body);
      res.send({ success: true, data: post });
    })
  )
  .patch(
    catchAsync(async (req, res, next) => {
      //1. find post by primary key
      const post = await Post.findByPk(req.params.postId);
      //2. check if post exists
      if (post) {
        await post.update(req.body, { fields: ["title", "body"] });
        return res.send({ success: true, data: post });
      }
      //5. if post doesn't exists
      next(new AppError("This Post doesnot exists!", 400));
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      //1. destroy a post if exists
      const post = Post.destroy({ where: { id: req.params.postId } });
      if (post) return res.sendStatus(204);
      //2. if post doesn't exists
      next(new AppError("This Post doesnot exists!", 400));
    })
  );
module.exports = router;
