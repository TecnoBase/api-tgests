const { fotos } = require("../../helpers/complements");
const { generateCodeLeptop } = require("../../helpers/generateCode");
const model = require("../../models/pVermelho");
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
    res.status(400).json({ mensagem: "Erro ao tentar listar " + error });
  }
};
controller.salvar = async (req, res) => {
  try {
    const codLeptop = await generateCodeLeptop();
    if (await model.findOne({ codLeptop })) {
      codLeptop = await generateCodeLeptop();
    }

    const { descricao, detalhes, marca, modelo, preco } = req.body;
    if (
      await model.findOne({
        descricao,
        detalhes,
        marca,
        modelo,
        preco,
        isDeleted: true,
      })
    ) {
      res.status(409).json({ mensagem: "Este registro já existe!" });
      !req.file;
    }

    if (!req.file || req.file === null || typeof req.file === undefined) {
      return res.status(404).json("Adicione a Imagem/Arquivo!");
    } else {
      const dados = await model.create({
        ...req.body,
        codLeptop,
        image: req.file.filename,
      });
      const serialize = {
        _id: dados._id,
        descricao: dados.descricao,
        detalhes: dados.detalhes,
        marca: dados.marca,
        modelo: dados.pagamentoF,
        especial: dados.modelo,
        preco: dados.preco,
        codLeptop: dados.codLeptop,
        image: dados.image,
      };
      return res.status(200).json(serialize);
    }
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar salvar " + error });
  }
};
controller.image = async (req, res) => {
  const formatos = fotos();
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
        descricao: dados.descricao,
        detalhes: dados.detalhes,
        marca: dados.marca,
        modelo: dados.pagamentoF,
        especial: dados.modelo,
        preco: dados.preco,
        codLeptop: dados.codLeptop,
        image: dados.image,
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
        descricao: dados.descricao,
        detalhes: dados.detalhes,
        marca: dados.marca,
        modelo: dados.pagamentoF,
        especial: dados.modelo,
        preco: dados.preco,
        codLeptop: dados.codLeptop,
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
