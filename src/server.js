'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const { response } = require('express');

const sequelize = new Sequelize('sqlite:memory:');

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

const app = express();
app.use(express.json());

app.post('/signup', async (request, response, next) => {
  console.log(request.body);
  bcrypt.hash(request.body.password, 15).then(async hash => {
    let newUser = await UserModel.create({
      username: request.body.username,
      password: hash,
    });
    response.send(newUser);
  })
});

app.post('/signin', async (request, response, next) => {
  console.log(request.headers);

  const encodedCredentials = request.headers.authorization.split(' ')[1];
  const decodedCredentials = base64.decode(encodedCredentials);
  console.log(decodedCredentials);
  const [ username, password ] = decodedCredentials.split(':');

  try {
    let user = await UserModel.findOne({ where: { username }});
    let isValid = await bcrypt.compare(password, user.password);
    if(isValid) {
      response.status(200);
      response.json(user);
    }
  } catch(e) {
    response.status(401);
    response.send(e);
  }
});

module.exports = {
  app,
  sequelize
};
