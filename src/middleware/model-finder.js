'use strict';

const app = express();
const bcrypt = require('bcrypt');
const express = require('express');
app.use(express.json());

try {
  const user = await Users.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    res.status(200).json(user);
  }
  else {
    throw new Error('Invalid User');
  }
} catch (error) { res.status(403).send('Invalid Login'); }