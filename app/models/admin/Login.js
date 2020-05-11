const connection = require("../../database/connection");
const Admin = require("../../models/admin/Admin");
const md5 = require("md5");

module.exports = {
  async tokenLogin(id_user) {
    const date = new Date();
    let newDate = date.getTime() + 1000 * 60 * 60 * 24;
    const verify = await this.tokenVerify(id_user);

    if (verify.status === true) {
      return verify.token;
    }

    const hash = md5(`${newDate}:${id_user}`);
    return hash;
  },
  async tokenVerify(id_user) {
    let verify = await connection
      .select("*")
      .from("person_token")
      .where({ person_id: id_user });
    verify = verify[0];

    if (verify.length !== 0) {
      const date = new Date();
      let DateNow = date.getTime();

      if (DateNow > verify.valid) {
        return { status: false };
      }
      return { status: true, token: verify.token };
    }
  },
  async tokenAuth(token) {
    let auth = await connection
      .select("*")
      .from("person_token")
      .where({ token: token });
    console.log(auth);
    if (auth.length !== 0) {
      auth = auth[0];
      const date = new Date();
      let DateNow = date.getTime();
      if (DateNow > auth.valid) {
        return {
          status: false,
          messager: "Token inspirado!",
          status_code: 400,
        };
      }
      let your_data = await Admin.your_data(auth.person_id);
      your_data = your_data[0];
      return { status: true, your_data };
    }

    return { status: false, messager: "Token incorreto!", status_code: 400 };
  },
};
