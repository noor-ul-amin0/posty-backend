const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Post = sequelize.define(
  "post",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["title", "userId"] }],
    paranoid: true,
  }
);

module.exports = Post;
