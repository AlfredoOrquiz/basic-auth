'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

app.post('/signin', async (req, res) => {});

module.exports = app;