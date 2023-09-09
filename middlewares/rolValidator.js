const { request, response } = require('express');

const isAdmin = (req = request, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      msg: 'Rol cant verify with jwt verification',
    });
  }

  const { rol, name } = req.authUser;

  if (rol !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} does not have administrator permissions`,
    });
  }

  next();
};

const hasRol = (...rol) => {
  return (req = request, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        msg: 'Rol cant verify with jwt verification',
      });
    }

    if (!rol.includes(req.authUser.rol)) {
      return res.status(401).json({
        msg: `User needs the next roles ${rol}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdmin,
  hasRol,
};
