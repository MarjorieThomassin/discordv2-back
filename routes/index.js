const routes = require('express').Router();

// define the index route
routes.post('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

const userRoutes = require('./user');

routes.use('/user', userRoutes);

const loginRoute = require('./login');
const settingRoutes = require('./settings');
const uploadRoute = require('./upload');

routes.use('/user', userRoutes);
routes.use('/login', loginRoute);
routes.use('/settings', settingRoutes);
routes.use('/upload', uploadRoute);
routes.use('/uploads', express.static('uploads'));


module.exports = routes;
