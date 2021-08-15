const router = require("express").Router();
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { Post, User } = require("../models");
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
      const posts = await Post.findAll({
        include: {
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          model: User,
          as: "author",
        },
      });
      posts.forEach(async (post) => console.log(await post.getAuthor()));
      res.send({ success: true, data: posts });
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
        //3. loop through those properties which user want to update.
        Object.keys(req.body.post).forEach((key) => {
          //4. don't let user to change foreign key (userId)
          if (key !== "userId") post[key] = req.body.post[key];
        });
        await post.save();
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
