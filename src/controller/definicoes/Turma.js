const model = require("../../models/turmas");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ descricao: "asc" });

    const count = await model.countDocuments({ isDeleted: true, ...props });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro tentar listar " + error });
  }
};

controller.salvar = async (req, res) => {
  try {
    const { descricao, tipo } = req.body;
    if (await model.findOne({ descricao, tipo, isDeleted: true }))
      return res.status(409).json({ mensagem: "Esta Turma já existe!" });

    const dados = await model.create({ ...req.body });
    const serializeTurma = {
      _id: dados._id,
      descricao: dados.descricao,
      tipo: dados.tipo,
    };
    return res.status(200).json(serializeTurma);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar salvar " + error });
  }
};

controller.findOne = async (req, res) => {
  try {
    const dados = await model.findById(req.params.id);

    if (!dados)
      return res.status(404).json({ mensagem: "Esta Turma não existe!" });

    const serializeTurma = {
      _id: dados._id,
      descricao: dados.descricao,
      tipo: dados.tipo,
    };
    return res.status(200).json(serializeTurma);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar encontrar " + error });
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
      return res.status(404).json({ mensagem: "Esta Turma não existe!" });

    const serializeTurma = {
      _id: dados._id,
      descricao: dados.descricao,
      tipo: dados.tipo,
    };
    return res.status(200).json(serializeTurma);
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
      return res.status(404).json({ mensagem: "Esta Turma não existe!" });

    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar deletar " + error });
  }
};

module.exports = controller;
