const connection = require("../../database/connection");

module.exports = {
  async checkEmail(email) {
    const list = await connection
      .select("email")
      .from("person")
      .where({ email: email });
    if (list.length === 0) {
      return {
        status: false,
        status_code: 400,
        messager: "Não encontramos esse e-mail em nossa base de dados.",
      };
    }
    return {
      status: true,
      status_code: 200,
      messager: "Encontramos seu e-mail.",
      list,
    };
  },
  async logar(email, password) {
    const logar = await connection
      .select("id")
      .from("person")
      .where({ email, password });

    if (logar.length === 0) {
      return {
        status: false,
        status_code: 400,
        messager: "Login ou senha invalidos",
      };
    }
    return {
      status: true,
      status_code: 200,
      messager: "Tudo certo!",
      logar,
    };
  },
  async your_data(id) {
    const your_data = await connection.select("*").from("person").where({ id });
    return your_data;
  },
};
