const router = require("express").Router();
const { verifyJWT } = require('../../middleware/auth');
const { uploadSingleIMG } = require("../../middleware/upload");


const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
} = require("../../controller/formacoes/Formador");

router.get("/", listar);
router.post("/", uploadSingleIMG, salvar);
router.put("/:id", editar);
router.delete("/:id", deletar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/formadores", verifyJWT, router);
