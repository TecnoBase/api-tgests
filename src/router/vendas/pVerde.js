const router = require("express").Router();
const { verifyJWT, verifyPermition } = require("../../middleware/auth");
const { uploadSingleIMG } = require("../../middleware/upload");

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
  image,
} = require("../../controller/venda/pVerde");

router.get("/", listar);
router.post("/", uploadSingleIMG, salvar);
router.put("/:id", verifyPermition, editar);
router.delete("/:id", verifyPermition, deletar);
router.get("/:id", verifyJWT, findOne);
router.get("/image/:id", image);

module.exports = (app) => app.use("/pverdes", router);
