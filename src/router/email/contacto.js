const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");

const {
  listar,
  salvar,
  deletar,
  findOne,
} = require("../../controller/email/Contacto");

router.get("/", listar);
router.post("/", salvar);
router.delete("/:id", verifyJWT, deletar);
router.get("/:id", verifyJWT, findOne);

module.exports = (app) => app.use("/contactos", router);
