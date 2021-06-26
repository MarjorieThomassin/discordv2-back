const settingRoutes = require('express').Router();
const db = require('../db-config');

settingRoutes.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT pseudo, bio, image_path FROM user WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

settingRoutes.put('/:id', (req, res) => {
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

module.exports = settingRoutes;
