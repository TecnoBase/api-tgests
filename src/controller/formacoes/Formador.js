const model = require("../../models/formadores");
const formandoModel = require("../../models/formandos");
const { generateCodeFormador } = require("../../helpers/generateCode");
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
    const codFormador = await generateCodeFormador();
    if (await model.findOne({ codFormador })) {
      codFormador = await generateCodeFormador();
    }

    const { bi, telefone, email, tipo, certifCENFFOR, image } = req.body;

    if (
      (await formandoModel.findOne({ bi })) ||
      (await formandoModel.findOne({ email })) ||
      (await formandoModel.findOne({ telefone }))
    )
      return res
        .status(409)
        .json({ mensagem: "O B.I, Email/Telefone está a ser usado!" });

    if (await model.findOne({ bi, telefone, email, isDeleted: true }))
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    if (tipo === "externo") {
      if (req.file) {
        const dados = await model.create({
          ...req.body,
          codFormador,
          certifCENFFOR: null,
          image: req.file.filename,
        });
        const serialize = {
          _id: dados._id,
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          telefone: dados.telefone,
          email: dados.email,
          tipo: dados.tipo,
          image: dados.image,
          codFormador: dados.codFormador,
          image: dados.image
        };
        return res.status(200).json(serialize);
      }

      return res
        .status(400)
        .json({ mensagem: "Erro: Formato nao suportado! " });
    } else {
      if (
        !certifCENFFOR ||
        certifCENFFOR === null ||
        typeof certifCENFFOR === undefined
      ) {
        return res
          .status(404)
          .json({ mensagem: "Nº do Certificado do CENFFOR é obrigatório!" });
      } else {
        if (req.file) {
          const dados = await model.create({
            ...req.body,
            codFormador,
            image: file,
          });
          const serialize = {
            _id: dados._id,
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            telefone: dados.telefone,
            email: dados.email,
            tipo: dados.tipo,
            certifCENFFOR: dados.certifCENFFOR,
            codFormador: dados.codFormador,
            image: dados.image,
          };
          return res.status(200).json(serialize);
        }

        return res
          .status(400)
          .json({ mensagem: "Erro: Formato nao suportado! " });
      }
    }
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
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      naturalidade: dados.naturalidade,
      nascimento: dados.nascimento,
      bi: dados.bi,
      telefone: dados.telefone,
      email: dados.email,
      genero: dados.genero,
      endereco: dados.endereco,
      tipo: dados.tipo,
      certifCENFFOR: dados.certifCENFFOR,
      areaFormacao: dados.areaFormacao,
      codFormador: dados.codFormador,
      image: dados.image,
      createdAt: dados.createdAt,
      updatedAt: dados.updatedAt,
    };
    return res.status(200).json(serialize);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro a tentar encontrar " + error });
  }
};

controller.editar = async (req, res) => {
  try {
    const { tipo, certifCENFFOR } = req.body;

    if (tipo === "externo") {
      if (!certifCENFFOR) {
        const dados = await model.findByIdAndUpdate(
          req.params.id,
          { ...req.body, certifCENFFOR: null },
          { new: true }
        );

        if (!dados)
          return res
            .status(404)
            .json({ mensagem: "Este registro não existe!" });

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
          tipo: dados.tipo,
          codFormador: dados.codFormador,
          image: dados.image,
        };
        return res.status(200).json(serialize);
      } else {
        const dados = await model.findByIdAndUpdate(
          req.params.id,
          { ...req.body, certifCENFFOR: null },
          { new: true }
        );

        if (!dados)
          return res
            .status(404)
            .json({ mensagem: "Este registro não existe!" });

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
          tipo: dados.tipo,
          codFormador: dados.codFormador,
          image: dados.image,
        };
        return res.status(200).json(serialize);
      }
    } else {
      if (
        !certifCENFFOR ||
        certifCENFFOR === null ||
        typeof certifCENFFOR === undefined
      ) {
        return res
          .status(404)
          .json({ mensagem: "Nº do Certificado do CENFFOR é obrigatório!" });
      } else {
        const dados = await model.findByIdAndUpdate(
          req.params.id,
          { ...req.body },
          { new: true }
        );

        if (!dados)
          return res
            .status(404)
            .json({ mensagem: "Este registro não existe!" });

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
          tipo: dados.tipo,
          certifCENFFOR: dados.certifCENFFOR,
          areaFormacao: dados.areaFormacao,
          codFormador: dados.codFormador,
          image: dados.image,
        };
        return res.status(200).json(serialize);
      }
    }
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
