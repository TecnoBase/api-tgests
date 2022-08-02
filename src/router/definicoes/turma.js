const router = require("express").Router();
const { verifyJWT } = require('../../middleware/auth')

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
} = require("../../controller/definicoes/Turma");

router.get("/", listar);
router.post("/", salvar);
router.put("/:id", editar);
router.delete("/:id", deletar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/turmas", verifyJWT, router);
