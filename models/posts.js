const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Post = sequelize.define(
  "post",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    // active: { type: DataTypes.BOOLEAN, default: true },
  },
  {
    timestamps: true,
    // Other model options go here
  }
);

module.exports = Post;
