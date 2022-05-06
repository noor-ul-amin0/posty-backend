const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Post = sequelize.define(
  "post",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: "Please provide a valid image url" },
      },
    },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["title", "userId"] }],
    paranoid: true,
  }
);

module.exports = Post;
