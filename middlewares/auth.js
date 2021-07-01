const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashPassword = async (req, res, next) => {
  req.body.password = await argon2.hash(req.body.password);
  next();
};

const verifyPassword = async (req, res) => {
  if (await argon2.verify(req.db.password, req.body.password)) {
    const token = jwt.sign({ sub: req.db.id }, 'secret');

    const data = { token, ...req.db };
    delete data.password;

    res.status(200).json(data);
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
