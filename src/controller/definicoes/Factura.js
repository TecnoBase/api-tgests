const model = require("../../models/inscricoes");
const { generateCodeFactura } = require("../../helpers/generateCode");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .populate({
        path: "inscricaoId",
        select:
          "codInscricao formandoId moduloId periodo pagamento valorMatricula valorInscricao",
        populate: {
          path: "moduloId",
          select: "cursoId descricao valorModulo",
          populate: { path: "cursoId", select: "descricao preco" },
        },
        populate: {
          path: "formandoId",
          select: "codFormando nome sobrenome",
        },
      })
      .sort({ codInscricao: "asc" });

    const count = await model.countDocuments({
      isDeleted: true,
      ...props,
    });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar listar " + error });
  }
};

controller.salvar = async (req, res) => {
  try {
    const { inscricaoId } = req.body;
    const codInscricao = await generateCodeFactura();
    if (await model.findOne({ codInscricao })) {
      codInscricao = await generateCodeFactura();
    }
    if (await model.findOne({ inscricaoId, isDeleted: true }))
      return res.status(409).json({
        mensagem: "Esta factura já existe!",
      });

    const dados = await model.create({
      ...req.body,
      codInscricao,
    });
    const serialize = {
      _id: dados._id,
      inscricaoId: dados.inscricaoId,
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
      inscricaoId: dados.inscricaoId,
      createdAt: dados.createdAt,
      updatedAt: dados.updatedAt,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar encontrar " + error });
  }
};

controller.editar = async (req, res) => {
  try {
    const dados = await model.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      inscricaoId: dados.inscricaoId,
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
