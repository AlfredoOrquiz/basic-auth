'use strict';

const app = express();
const bcrypt = require('bcrypt');
const express = require('express');
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

module.exports = app;