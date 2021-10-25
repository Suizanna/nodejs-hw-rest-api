const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const avatars = require("./avatars");
const favoriteContacts = require('./favoriteContacts')
const verify = require("./verify");
const reVerify = require("./reVerify");


module.exports = {
  register,
  login,
  logout,
  current,
  avatars,
  favoriteContacts,
  verify,
  reVerify,
};
