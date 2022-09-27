'use strict';

const app = express();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { response } = require('express');
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

const UserModel= sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = {
  app,
  sequelize
};
