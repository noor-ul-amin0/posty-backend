const User = require("./user");
const Post = require("./posts");

User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
});
Post.belongsTo(User, { as: "author", foreignKey: "userId" });

module.exports = { User, Post };
