const md5 = require("md5");
const sha1 = require("sha1");

function passwordHash(passowd) {
  return md5(sha1(passowd));
}

module.exports = passwordHash;
