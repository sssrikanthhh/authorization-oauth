const jwt = require('jsonwebtoken');

require('dotenv').config();

const decodeUser = (token) => {
  return jwt.verify(token, process.env.JWT_SCREAT, (err, decode) => {
    if (err) {
      return err;
    }
    return decode;
  });
};

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.Authorization) {
      return res.status(401).send({ err: "bearer token is required!" });
    }

    if (!req.headers.Authorization.startsWith('Bearer ')) {
      return res.status(401).send({ err: "bearer token is required!" });
    }

    const token = req.header.Authorization.split(" ")[1];
    let decodedUser = decodeUser(token);
    if (!decodedUser) {
      return res.status(401).send({ err: "invalid token!" });
    }
    req.user = decodeUser.user;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = authenticate;