const jwt = require("jsonwebtoken");
const key = "KEY";

module.exports = {
  signToken(payload) {
    return jwt.sign(payload, key); //sengaja tidak dikasih expire
  },
  verifyToken(token) {
    return jwt.verify(token, key);
  },
};
