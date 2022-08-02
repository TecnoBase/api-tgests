const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");

const {
  listar,
  salvar,
  findOne,
} = require("../../controller/email/Subscricao");

router.post("/", listar);
router.post("/", salvar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/subscrioes", router);
