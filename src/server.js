const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(express.static('../public'));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.ADMIN_PORT,
    process.env.GESTOR_PORT
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, GET, POST, PUT, PATCH, OPTIONS"
  );
  next();
});

//routes
//conta
require("./router/conta/usuario")(app);
require("./router/conta/auth")(app);

//definicoes
require("./router/definicoes/comprovativo")(app);
require("./router/definicoes/horario")(app);
require("./router/definicoes/municipio")(app);
require("./router/definicoes/turma")(app);
require("./router/definicoes/tickets")(app);

//formacoes geral
require("./router/formacoes/formando")(app);
require("./router/formacoes/curso")(app);
require("./router/formacoes/formador")(app);

//formacoes
require("./router/formacoes/addCursos")(app);
require("./router/formacoes/inscricao")(app);
require("./router/formacoes/online")(app);
require("./router/formacoes/modulo")(app);
require("./router/formacoes/turmaInscricao")(app);

//tecnobusiness

//Vendas


//Email
require("./router/email/contacto")(app);
require("./router/email/subscricao")(app);

module.exports = app;
