'use strict';

const { app, sequelize } = require('./src/server.js');

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('App is running');
  });  
});