const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
} = require("../../controller/definicoes/Tickets");

router.post("/", salvar);
router.get("/", listar);
router.put("/:id", editar);
router.delete("/:id", deletar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/tickets", verifyJWT, router);
