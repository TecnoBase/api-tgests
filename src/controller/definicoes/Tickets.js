const model = require("../../models/tickets");
const controller = {};

controller.salvar = async (req, res) => {
  try {
    const { assunto, detalhes } = req.body;
    if (await model.findOne({ assunto, detalhes, isDeleted: true })) {
      return res.status(409).json({ mensagem: "Este registro já existe!" });
    }

    const dados = await model.create({ ...req.body });
    const serialize = {
      _id: dados._id,
      assunto: dados.assunto,
      detalhes: dados.detalhes,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar salvar " + error });
  }
};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ "assunto": "asc" });

    const count = await model.countDocuments({ isDeleted: true, ...props });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar listar " + error });
  }
};

controller.findOne = async (req, res) => {
  try {
    const dados = await model.findById(req.params.id);

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      assunto: dados.assunto,
      detalhes: dados.detalhes,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro a tentar encontrar " + error });
  }
};

controller.editar = async (req, res) => {
  try {
    const dados = await model.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      assunto: dados.assunto,
      detalhes: dados.detalhes,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar actualizar " + error });
  }
};

controller.deletar = async (req, res) => {
  try {
    const dados = await model.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar deletar " + error });
  }
};

module.exports = controller;
