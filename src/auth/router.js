'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('./models/users-models');

app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { 
    res.status(403).send('Error creating password');
  }
  try {
    req.body.username = await bcrypt.hash(req.body.username, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error creating username')
  }
});

app.post('/signin', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { 
    res.status(403).send('Error creating password');
  }
  try {
    req.body.username = await bcrypt.hash(req.body.username, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error creating username')
  }
});

module.exports = app;