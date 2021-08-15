const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { isEmail } = require("validator");
const User = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 50],
          msg: "firstName must be at least 5 characters long and less than 50.",
        },
        // min: {
        //   args: [5],
        //   msg: "firstName must be at least 5 characters long.",
        // },
        // max: {
        //   args: [50],
        //   msg: "firstName must not be greater than 50 characters",
        // },
      },
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue("firstName", value.toLowerCase().trim());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // min: {
        //   args: [5],
        //   msg: "lastName must be at least 5 characters long.",
        // },
        // max: {
        //   args: [50],
        //   msg: "lastName must not be greater than 50 characters",
        // },
      },

      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue("lastName", value.toLowerCase().trim());
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
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
        // min: {
        //   args: [5],
        //   msg: "password must be at least 5 characters long.",
        // },
        // max: {
        //   args: [50],
        //   msg: "password must not be greater than 50 characters",
        // },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
