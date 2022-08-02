const model = require("../../models/subscricao");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ email: "asc" });
    const count = await model.countDocuments({
      isDeleted: true,
      ...props,
    });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro tentar listar " + error });
  }
};

controller.salvar = async (req, res) => {
  try {
    const { email } = req.body;
    if (
      await model.findOne({
        email,
        isDeleted: true,
      })
    )
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    const dados = await model.create({ ...req.body });
    const serialize = {
      _id: dados._id,
      email: dados.email,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar salvar " + error });
  }
};

controller.findOne = async (req, res) => {
  try {
    const dados = await model.findById(req.params.id);

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      email: dados.email,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar encontrar " + error });
  }
};

module.exports = controller;
