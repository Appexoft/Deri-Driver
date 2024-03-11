const { User } = require("../models");
const { roles } = require("../helpers/constants");
const axios = require("axios");
const { buildAuthenticatedRouter } = require("@adminjs/express");

/**
 *
 * @param {AdminBro} admin
 * @return {Express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    // eslint-disable-next-line no-undef
    cookieName: process.env.COOKIE_NAME || "dev-adminpanel",
    // eslint-disable-next-line no-undef
    cookiePassword: process.env.COOKIE_PASSWORD || "Admin123$",
    authenticate: async (email, password) => {
      if (!email || !password) return null;

      try {
        const user = await User.findOne({ where: { email } });
        if (user && user.role === roles.ADMIN) {
          const params = new URLSearchParams();
          params.append("grant_type", "password");
          params.append("username", email);
          params.append("password", password);
          params.append("scope", "openid profile");
          // eslint-disable-next-line no-undef
          params.append("client_id", process.env.AUTH0_CLIENT_ID);
          // eslint-disable-next-line no-undef
          params.append("client_secret", process.env.AUTH0_CLIENT_SECRET);

          const res = await axios.post(
            // eslint-disable-next-line no-undef
            `${process.env.AUTH0_ISSUER}oauth/token`,
            params
          );

          if (res && res.status == 200) {
            return user;
          }
        }
        return null;
      } catch (error) {
        console.error("Error <admin.router/authenticate>: ", error);
        return null;
      }
    },
  });
  return router;
};

module.exports = buildAdminRouter;
