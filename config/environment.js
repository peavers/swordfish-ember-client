/**
 * /* eslint-env node
 *
 * @format
 */

"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "swordfish-ember-client",
    podModulePrefix: "swordfish-ember-client/features",
    environment: environment,
    rootURL: "/",
    locationType: "auto",
    pace: { color: "black" },

    APP: {
      SWORDFISH: process.env.SWORDFISH,
      PUSHER_KEY: process.env.PUSHER_KEY,
      PUSHER_SECRET: process.env.PUSHER_SECRET
    }
  };

  ENV["ember-simple-auth"] = {
    authenticationRoute: "/",
    routeAfterAuthentication: "instances",
    routeIfAlreadyAuthenticated: "instances",
    auth0: {
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN
    }
  };

  if (environment === "development") {
    ENV.APP.SWORDFISH = "http://localhost:8080";
    ENV.APP.PUSHER_KEY = process.env.DEV_PUSHER_KEY;
    ENV.APP.PUSHER_SECRET = process.env.DEV_PUSHER_SECRET;
  }

  return ENV;
};
