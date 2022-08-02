const router = require("express").Router();

const { login } = require("../../controller/conta/Auth");

router.post("/login", login);

module.exports = (app) => app.use("/auth", router);
