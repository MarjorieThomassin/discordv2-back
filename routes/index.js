const routes = require('express').Router();
const { verifyPassword } = require('../middlewares/auth');
const db = require('../db-config');

// define the index route
routes.post('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

routes.post('/login', (req, res, next) => {
  const user = {
    email: req.body.email,
  };

  db.query('SELECT id, password FROM user WHERE email = ?', [user.email], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (results.length === 1) {
      req.db = { id: results[0].id, password: results[0].password };
      next();
    } else {
      res.sendStatus(400);
    }
  });
}, verifyPassword);

const userRoutes = require('./user');
<<<<<<< Updated upstream

routes.use('/user', userRoutes);
=======
const loginRoute = require('./login');
const settingRoutes = require('./settings');
const uploadRoute = require('./upload');

routes.use('/user', userRoutes);
routes.use('/login', loginRoute);
routes.use('/settings', settingRoutes);
routes.use('/upload', uploadRoute);
routes.use('/uploads', express.static('uploads'));
>>>>>>> Stashed changes

module.exports = routes;
