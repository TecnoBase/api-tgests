const model = require("../../models/usuarios");
const bcrypt = require("bcryptjs");
const controller = {};
const { fotos } = require("../../helpers/complements");

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ nome: "asc" });
    const count = await model.countDocuments({ isDeleted: true, ...props });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "erro ao tentar listar " + error });
  }
};
controller.salvar = async (req, res) => {
  try {
    const { email, rules, senhaClara, senha } = req.body;
    if (await model.findOne({ email, rules, senhaClara, isDeleted: true }))
      return res.status(409).json({ mensagem: "Este registro já existe! " });

    if (senhaClara === senha) {
      const hash = await bcrypt.hash(senha, 10);
      if (!req.file || req.file === null || typeof req.file === undefined) {
        return res.status(404).json("Adicione a Imagem/Arquivo!");
      } else {
        const dados = await model.create({
          ...req.body,
          image: req.file.filename,
          senha: hash,
        });
        const serialize = {
          _id: dados._id,
          nome: dados.nome,
          email: dados.email,
          image: dados.image,
        };
        return res.status(200).json(serialize);
      }
    } else {
      return res.status(409).json({ mensagem: "As senhas não batem! " });
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
    res.status(200).sendFile
    (dados.image);
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
      image: dados.image,
      nome: dados.nome,
      email: dados.email,
      rules: dados.rules,
      senha: dados.senhaClara,
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
      { ...req.body, },
      { new: true }
    );

    if (!dados)
      return res.status(404).json({ mensagem: "Este registro não existe!" });

    const serialize = {
      _id: dados._id,
      nome: dados.nome,
      email: dados.email,
      image: dados.image,
      rules: dados.rules,
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
