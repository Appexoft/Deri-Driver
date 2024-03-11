const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(404).json({
      msg: "El usuario no fue encontrado",
    });
  }

  const { isAdmin, name } = req.user;

  if (!isAdmin) {
    return res.status(401).json({
      msg: `${name} no tienes permisos para esta acción`,
    });
  }

  next();
};

module.exports = { isAdmin };
