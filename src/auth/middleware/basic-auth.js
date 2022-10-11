'use strict';

const base64 = require('base-64');
const { Users } = require('./models/users-models.js');

module.exports = async (req, res, next) => {
  if (!req.header.authorization) {return _authError(); }

  let decodedUserInfoAuthorization = req.headers.authorization.split(' ').pop();
  let [user, password] = base64.decode(decodedUserInfoAuthorization).split(':');

  try {
    req.user = await Users.authenticateBasic(user, password);
    next();
  } catch (e) {
    next("Invalid login");
  }
}
