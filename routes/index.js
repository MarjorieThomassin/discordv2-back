const routes = require('express').Router();

// define the index route
routes.post('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

const userRoutes = require('./user');
const loginRoute = require('./login');

routes.use('/user', userRoutes);
routes.use('/login', loginRoute);

module.exports = routes;
