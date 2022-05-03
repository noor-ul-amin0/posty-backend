const User = require("./user");
const Post = require("./posts");
const Tag = require("./tag");
User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
});
Post.belongsTo(User, { as: "author", foreignKey: "userId" });
Tag.belongsToMany(Post, { through: "TagPost" });
Post.belongsToMany(Tag, { through: "TagPost" });
module.exports = { User, Post, Tag };
