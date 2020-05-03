const express = require("express");
const nunjucks = require("nunjucks");
const mysql = require("mysql2");

const server = express();

//Congurando servidor
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

//Configuracao do BANCO
const connection = mysql.createConnection({
  host: "mysql669.umbler.com",
  user: "whitecode",
  password: "andreregedit",
  port: 41890,
  database: "whitecode",
});

// Configurando a template engine
nunjucks.configure("./views", {
  express: server,
  noCache: true,
});

server.get("/", function (req, res) {
  return res.render("index.njk");
});
server.get("/desenvolvimento", (req, res) => {
  return res.render("dev/index.njk", {
    page: "White Code",
    details: "Equipe de desenvolvimento da A.V.A INFORMATICA",
  });
});
server.get("/meucomp", (req, res) => {
  return res.render("myComputer/index.njk", {
    page: "Meu Computador",
    details: "Acompanhe em tempo real o estado do seu computador.",
  });
});
server.get("/comDetails", (req, res) => {
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

var port = process.env.PORT || 3333;
app.listen(port, function () {
  console.log(`Umbler listening on port  ${port}`);
});
