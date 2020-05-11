const connection = require("../../database/connection");
const passwordHash = require("../../utils/passwordHash");

const Admin = require("../../models/admin/Admin");
const Login = require("../../models/admin/Login");
module.exports = {
  async index(req, res) {
    return res.render("admin/index.njk");
  },
  async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        messager: " Você precisa informar o email.",
      });
    } else if (!password) {
      return res.status(400).json({
        messager: " Você precisa informar sua senha.",
      });
    }

    const check = await Admin.checkEmail(email);
    if (check.status === false) {
      return res.status(check.status_code).json({ messager: check.messager });
    }
    const newPassword = passwordHash(password);
    const login = await Admin.logar(email, newPassword);
    const token = await Login.tokenLogin(login.logar[0].id);
    let your_data = await Admin.your_data(login.logar[0].id);
    your_data = your_data[0];

    return res.json({ messager: "Tudo certo!", token: token, your_data });
  },
};
