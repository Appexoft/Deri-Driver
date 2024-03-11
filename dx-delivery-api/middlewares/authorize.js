/* eslint-disable no-undef */
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { roles } = require("../helpers/constants");
const { User } = require("../models");

module.exports = authorize;

function authorize(checkRole = [], allowEmptyUser = false) {
  try {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof checkRole === "string") {
      checkRole = [checkRole];
    }

    return [
      // accept token by query
      async (req, res, next) => {
        const { token } = req.query;
        if (token) {
          req.headers["authorization"] = `Bearer ${token}`;
        }
        next();
      },
      // authenticate JWT token and attach user to request object (req.user)
      jwt({
        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
        }),

        // Validate the audience and the issuer.
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        algorithms: [process.env.AUTH0_ALGORITHM],
      }),

      // authorize based on user role
      async (req, res, next) => {
        const { sub } = req.user;
        const user = await User.findOne({ where: { authId: sub } });
        if (user) {
          const { name } = user;

          if (!user.CompanyId) {
            req.user.isAdmin = false;
            return res
              .status(400)
              .send("El usuario no está asociado a una compañia");
          }
          req.user.role = user.role;
          req.user.name = name;
          req.user.isAdmin = user.role === roles.ADMIN;
          req.user.isRider = user.role === roles.RIDER;
          req.user.id = user.id;
          req.user.BusinessId = user.BusinessId;
          req.user.CompanyId = user.CompanyId;

          if (checkRole.length && !checkRole.includes(req.user.role)) {
            // user's role is not authorized
            return res
                .status(403)
                .json({ msg: `${name} no tienes permisos para esta acción` });
          }
        } else {
          req.user.isAdmin = false;
          if (!allowEmptyUser) {
            // user's not found
            return res.status(404).json({ msg: "Usuario no encontrado" });
          }
        }
        // authentication and authorization successful
        next();
      },
    ];
  } catch (error) {
    return res.status(500).send(error);
  }
}
