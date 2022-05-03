const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Tag = sequelize.define(
  "tag",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notNull: { msg: "Tag name is required" } },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Tag;
