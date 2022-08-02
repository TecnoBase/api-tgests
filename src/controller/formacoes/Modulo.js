const { generateCodeModulo } = require("../../helpers/generateCode");
const model = require("../../models/modulos");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .populate({ path: "cursoId", select: "descricao preco" })
      .sort({ descricao: "asc" });
    const count = await model.countDocuments({ isDeleted: true, ...props });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar listar " + error });
  }
};

controller.salvar = async (req, res) => {
  try {
    const codModulo = await generateCodeModulo();
    if (await model.findOne({ codModulo })) {
      codModulo = await generateCodeModulo();
    }

    const { descricao, cursoId } = req.body;
    if (await model.findOne({ descricao, cursoId, isDeleted: true }))
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    const dados = await model.create({ ...req.body, codModulo });
    const serialize = {
      _id: dados._id,
      cursoId: dados.cursoId,
      descricao: dados.descricao,
      valorModulo: dados.valorModulo,
      codModulo: dados.codModulo
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
      cursoId: dados.cursoId,
      descricao: dados.descricao,
      valorModulo: dados.valorModulo,
      codModulo: dados.codModulo
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
      cursoId: dados.cursoId,
      descricao: dados.descricao,
      valorModulo: dados.valorModulo,
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
