const Auth = require("../../models/admin/Login");
module.exports = {
  async auth(req, res) {
    const { authorization } = req.headers;
    const auth = await Auth.tokenAuth(authorization);
    if (auth.status === false) {
      return res.status(auth.status_code).json({ messager: auth.messager });
    }
    return res.json(auth);
  },
};
