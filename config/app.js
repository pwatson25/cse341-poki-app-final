require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationHost: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  searchExtension: process.env.POST_LOGIN_URI,
  baseUri: process.env.BASE_URI,
  authorizationExtension: process.env.AUTHORIZATION_LOGIN_URI,
};
