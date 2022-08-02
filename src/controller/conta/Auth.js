const bcrypt = require("bcryptjs");
const authModel = require("../../models/usuarios");
const { generateToken } = require("../../middleware/auth");
const authController = {};

authController.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const dados = await authModel.findOne({ email });

    if (!dados)
      return res.status(400).json({ mensagem: "Email ou senha inválida!" });

    const validarSenha = await bcrypt.compareSync(senha, dados.senha);

    if (!validarSenha)
      return res.status(400).json({ mensagem: "Email ou senha inválida!" });

    const payload = {
      id: dados._id,
      nome: dados.nome,
      rules: dados.rules,
      isDeleted: dados.isDeleted,
    };
    if (dados.isDeleted === false)
      return res.status(406).json({
        mensagem:
          "Esta conta não existe/está desactivada. Favor de contactar a central!",
      });

    const token = await generateToken(payload);

    res.cookie("cookie", token, { httpOnly: true });
    res.status(200).json({
      Mensagem: "Bem-vindo Tecnobaseano ",
      id: dados._id,
      nome: dados.nome,
      rules: dados.rules,
      isDeleted: dados.isDeleted,
      token: token,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Ocorreu um erro a tentar logar " + error });
  }
};

module.exports = authController;
