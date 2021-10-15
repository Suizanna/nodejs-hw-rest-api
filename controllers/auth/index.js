const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const avatars = require("./avatars");
const favoriteContacts = require('./favoriteContacts')

module.exports = {
  register,
  login,
  logout,
  current,
  avatars,
  favoriteContacts,
};
