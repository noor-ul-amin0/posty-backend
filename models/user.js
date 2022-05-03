const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const User = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "First Name must be at least 5 characters long and less than 50.",
        },
      },
      set(value) {
        this.setDataValue("firstName", value.toLowerCase().trim());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "Last Name must be at least 5 characters long and less than 50.",
        },
      },
      set(value) {
        this.setDataValue("lastName", value.toLowerCase().trim());
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [18],
          msg: "Age must be greater than or equal to 18",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: "password must be at least 5 characters long and less than 50.",
        },
      },
      // async set(value) {
      //   // Storing passwords in plaintext in the database is terrible.
      //   // Hashing the value with an appropriate cryptographic hash function is better.
      //   const hash = await bcrypt.hash(value, 12);
      //   this.setDataValue("password", hash);
      // },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    onDelete: "RESTRICT",
  }
);
module.exports = User;
