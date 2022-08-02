const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");
const { uploadSinglePDF } = require("../../middleware/upload");

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
  image
} = require("../../controller/definicoes/Comprovativo");

router.get("/", listar);
router.post("/", uploadSinglePDF, salvar);
router.put("/:id", verifyJWT, editar);
router.delete("/:id", verifyJWT, deletar);
router.get("/:id", findOne);
router.get("/image/:id", image);

module.exports = (app) => app.use("/comprovativos", router);
