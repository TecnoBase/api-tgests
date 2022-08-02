const model = require("../../models/formandos");
const formadorModel = require("../../models/formadores");
const { generateCodeFormando } = require("../../helpers/generateCode");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ nome: "asc" });
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
    const { email, bi, telefone } = req.body;
    const codFormando = await generateCodeFormando();
    if (await model.findOne({ codFormando })) {
      codFormando = await generateCodeFormando();
    }

    if (
      (await formadorModel.findOne({ bi })) ||
      (await formadorModel.findOne({ email })) ||
      (await formadorModel.findOne({ telefone }))
    )
      return res
        .status(409)
        .json({ mensagem: "O B.I, Email/Telefone está a ser usado!" });

    if (await model.findOne({ bi, email, telefone, estado: true }))
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    if (req.file) {
      const dados = await model.create({ ...req.body, codFormando });
      const serialize = {
        _id: dados._id,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        telefone: dados.telefone,
        email: dados.email,
        tipo: dados.tipo,
        areaFormacao: dados.areaFormacao,
        codFormando: dados.codFormando,
        image: dados.image,
      };
      return res.status(200).json(serialize);
    }

    return res.status(400).json({ mensagem: "Erro: Formato nao suportado! " });
  } catch (error) {
    res.status(400).json({ Mensagem: "Erro ao tentar salvar " + error });
  }
};

controller.findOne = async (req, res) => {
  try {
    const dados = await model.findById(req.params.id);

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      naturalidade: dados.naturalidade,
      nascimento: dados.nascimento,
      bi: dados.bi,
      telefone: dados.telefone,
      genero: dados.genero,
      endereco: dados.endereco,
      email: dados.email,
      docEntregue: dados.docEntregue,
      tipo: dados.tipo,
      areaFormacao: dados.areaFormacao,
      codFormando: dados.codFormando,
      image: dados.image,
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
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      naturalidade: dados.naturalidade,
      nascimento: dados.nascimento,
      bi: dados.bi,
      telefone: dados.telefone,
      genero: dados.genero,
      endereco: dados.endereco,
      email: dados.email,
      areaFormacao: dados.areaFormacao,
      docEntregue: dados.docEntregue,
      tipo: dados.tipo,
      codFormando: dados.codFormando,
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
