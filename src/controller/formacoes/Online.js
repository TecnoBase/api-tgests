const model = require("../../models/online");
const { generateCodeOnline } = require("../../helpers/generateCode");
const { pdf } = require("../../helpers/complements");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .populate({
        path: "cursoId",
        select: "codCurso descricao preco duracao especial pagamentoF",
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
    const {
      cursoId,
      nome,
      sobrenome,
      provincia,
      bi,
      telefone,
      email,
      modAula,
    } = req.body;
    const codInscricao = await generateCodeOnline();
    if (await model.findOne({ codInscricao })) {
      codInscricao = await generateCodeOnline();
    }
    if (
      await model.findOne({
        cursoId,
        nome,
        sobrenome,
        provincia,
        bi,
        telefone,
        email,
        modAula,
        isDeleted: true,
      })
    )
      return res.status(409).json({
        mensagem: "Este registro já tem inscrição!",
      });
    if (!req.file || req.file === null || typeof req.file === undefined) {
      return res.status(404).json("Adicione a Imagem/Arquivo!");
    } else {
      const dados = await model.create({
        ...req.body,
        codInscricao,
        image: req.file.path,
      });
      const serialize = {
        _id: dados._id,
        cursoId: dados.cursoId,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        provincia: dados.provincia,
        bi: dados.bi,
        telefone: dados.telefone,
        email: dados.email,
        modAula: dados.modAula,
        image: dados.image,
        codInscricao: dados.codInscricao,
      };
      return res.status(200).json(serialize);
    }
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar salvar " + error });
  }
};
controller.image = async (req, res) => {
  const formatos = pdf();
  try {
    const dados = await model.findById(req.params.id);

    if (!dados || !dados.image) {
      return res.status(404).json({ mensagem: "Este registro não existe!" });
    }
    res.status(200).set("Content-Type", formatos);
    res.status(200).sendFile(dados.image);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar encontrar " + error });
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
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      provincia: dados.provincia,
      bi: dados.bi,
      telefone: dados.telefone,
      email: dados.email,
      modAula: dados.modAula,
      compP: dados.compP,
      image: dados.image,
      codInscricao: dados.codInscricao,
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
      cursoId: dados.cursoId,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      provincia: dados.provincia,
      bi: dados.bi,
      telefone: dados.telefone,
      email: dados.email,
      modAula: dados.modAula,
      compP: dados.compP,
      image: dados.image,
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
