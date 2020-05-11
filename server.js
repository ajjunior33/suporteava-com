const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

const route = require("./routes");

//Congurando servidor
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

// Configurando a template engine
nunjucks.configure("./app/views", {
  express: server,
  noCache: true,
});

server.use(route);

const porta = process.env.ANDRE || 3333;
server.listen(porta, function () {
  console.log(`Server running port:  ${porta}`);
});
