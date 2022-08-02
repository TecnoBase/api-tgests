const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");

const { uploadSingleIMG } = require("../../middleware/upload");

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
  image
} = require("../../controller/formacoes/Online");

router.get("/", verifyJWT, listar);
router.post("/", uploadSingleIMG, salvar);
router.put("/:id", verifyJWT, editar);
router.delete("/:id", verifyJWT, deletar);
router.get("/:id", findOne);
router.get("/image/:id", image);

module.exports = (app) => app.use("/online", router);
