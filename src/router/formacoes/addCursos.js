const router = require("express").Router();
const { verifyJWT } = require('../../middleware/auth')

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
} = require("../../controller/formacoes/AddCursos");

router.get("/", listar);
router.post("/", salvar);
router.put("/:id", editar);
router.delete("/:id", deletar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/addcursos", verifyJWT, router);
