const authorize = (perRoles) => {
  return (req, res, next) => {
    let isAllowed = false;
    perRoles.map(role => {
      if (req.user.role.includes(role)) {
        isAllowed = true;
      }
    });
    if (isAllowed) {
      return next();
    } else {
      return res.status(401).send({ err: 'unauthorized' });
    }
  };
};

module.exports = authorize;