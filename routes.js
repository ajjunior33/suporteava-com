const { Router } = require("express");

const route = Router();

const AdminControllers = require("./app/controllers/admin/AdminController");
const AuthController = require("./app/controllers/auth/AuthController");

route.get("/", function (req, res) {
  return res.render("index.njk");
});
route.get("/desenvolvimento", (req, res) => {
  return res.render("dev/index.njk", {
    page: "White Code",
    details: "Equipe de desenvolvimento da A.V.A INFORMATICA",
  });
});
route.get("/meucomp", (req, res) => {
  return res.render("myComputer/index.njk", {
    page: "Meu Computador",
    details: "Acompanhe em tempo real o estado do seu computador.",
  });
});
route.get("/comDetails", (req, res) => {
  const { id } = req.query;
  console.log(id);

  connection.query(`SELECT * FROM computadores WHERE id = ${id}`, function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status(400).json(err);
    }
    results = results[0];

    return res.render("myComputer/details.njk", {
      page: "Meu Computador",
      details: `Seu computador ${results.id}`,
      computerDetails: results,
    });
  });
});

route.get("/admin", AdminControllers.index);
route.post("/admin", AdminControllers.login);

route.post("/auth", AuthController.auth);

module.exports = route;
