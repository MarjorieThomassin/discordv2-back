const userRoutes = require('express').Router();
const db = require('../db-config');
const { hashPassword } = require('../middlewares/auth');

userRoutes.get('/', (req, res) => {
  db.query('SELECT * from user', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

userRoutes.post('/', hashPassword, (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  db.query('INSERT INTO user (email, password) VALUES (?, ?)', [user.email, user.password], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      delete user.password;
      res.status(201).json({ ...user, id: results.insertId });
    }
  });
});

userRoutes.delete('/:id', (req, res) => {
  const user = req.params.id;
  connection.query(
    'DELETE FROM user WHERE id = ?',
    [user],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an user');
      } else {
        res.status(200).send('user deleted!');
      }
    },
  );
});

userRoutes.put('/:id', (req, res) => {
  const user = {
    pseudo: req.body.pseudo,
    bio: req.body.bio,
    image_path: req.body.image_path,
    id: req.params.id,
  };

  db.query('UPDATE `user` SET `pseudo`="?", `bio`="?", `image_path`="?" WHERE id = ?', [user.pseudo, user.bio, user.image_path, user.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(201).json(results);
    }
  });
});
module.exports = userRoutes;
