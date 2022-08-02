const { generateCodeHorario } = require("../../helpers/generateCode");
const model = require("../../models/horarios");
const controller = {};

controller.salvar = async (req, res) => {
  try {
    const codHorario = await generateCodeHorario();
    if (await model.findOne({ codHorario })) {
      codHorario = await generateCodeHorario();
    }

    const { dias, inicio, termino } = req.body;
    if (await model.findOne({ dias, inicio, termino, isDeleted: true }))
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    const dados = await model.create({ ...req.body, codHorario });
    const serialize = {
      _id: dados._id,
      inicio: dados.inicio,
      termino: dados.termino,
      dias: dados.dias,
      codHorario: dados.codHorario,
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
      .sort({ inicio: "asc" });

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
      inicio: dados.inicio,
      termino: dados.termino,
      dias: dados.dias,
      codHorario: dados.codHorario,
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
      inicio: dados.inicio,
      termino: dados.termino,
      dias: dados.dias,
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
