const model = require("../../models/turmaInscricao");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .populate({
        path: "addCursoId",
        select: "cursoId",
        populate: { path: "cursoId", select: "descricao" },
      })
      .populate({
        path: "addCursoId",
        select: "formadorId",
        populate: { path: "formadorId", select: "codFormador nome sobrenome" },
      })
      .populate({
        path: "inscricaoId",
        select: "codInscricao formandoId periodo",
        populate: { path: "formandoId", select: "nome sobrenome codFormando" },
      })
      .populate({
        path: "inscricaoId",
        select: "moduloId",
        populate: {
          path: "moduloId",
          select: "descricao cursoId valorModulo",
          populate: { path: "cursoId", select: "descricao" },
        },
      })
      .populate({ path: "horarioId", select: "inicio termino dias" })
      .populate({ path: "turmaId", select: "descricao" })
      .sort({ turmaId: "asc" });
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
    const { turmaId, inscricaoId, addCursoId, horarioId } = req.body;
    if (
      await model.findOne({
        turmaId,
        inscricaoId,
        addCursoId,
        horarioId,
        isDeleted: true,
      })
    )
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    const dados = await model.create({ ...req.body });
    const serialize = {
      _id: dados._id,
      turmaId: dados.turmaId,
      inscricaoId: dados.inscricaoId,
      addCursoId: dados.addCursoId,
      horarioId: dados.horarioId,
      inicio: dados.inicio,
      termino: dados.termino,
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
      turmaId: dados.turmaId,
      inscricaoId: dados.inscricaoId,
      addCursoId: dados.addCursoId,
      horarioId: dados.horarioId,
      inicio: dados.inicio,
      termino: dados.termino,
    };
    return res.status(200).json(serialize);
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
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      turmaId: dados.turmaId,
      inscricaoId: dados.inscricaoId,
      addCursoId: dados.addCursoId,
      horarioId: dados.horarioId,
      inicio: dados.inicio,
      termino: dados.termino,
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
      { estado: false },
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
