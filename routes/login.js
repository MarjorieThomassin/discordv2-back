const loginRoute = require('express').Router();
const { verifyPassword } = require('../middlewares/auth');
const db = require('../db-config');

loginRoute.post('/', (req, res, next) => {
  const user = {
    email: req.body.email,
  };

  db.query('SELECT id, pseudo, password FROM user WHERE email = ?', [user.email], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (results.length === 1) {
      const {
        id,
        pseudo,
        email,
        password,
      } = results[0];
      req.db = {
        id, pseudo, email, password,
      };
      next();
    } else {
      res.sendStatus(400);
    }
  });
}, verifyPassword);

module.exports = loginRoute;
