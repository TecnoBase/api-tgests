const { fotos } = require("../../helpers/complements");
const { generateCodeCurso } = require("../../helpers/generateCode");
const model = require("../../models/cursos");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model.find({ isDeleted: true, ...props });
    const count = await model.countDocuments({ isDeleted: true, ...props });
    res.status(200).json({ dados, total: count });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao tentar listar " + error });
  }
};
controller.salvar = async (req, res) => {
  try {
    const codCurso = await generateCodeCurso();
    if (await model.findOne({ codCurso })) {
      codCurso = await generateCodeCurso();
    }

    const { descricao, duracao, tipo, pagamentoF, especial } = req.body;
    if (
      await model.findOne({
        descricao,
        duracao,
        tipo,
        pagamentoF,
        especial,
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
        codCurso,
        image: req.file.path,
      });
      const serialize = {
        _id: dados._id,
        descricao: dados.descricao,
        duracao: dados.duracao,
        tipo: dados.tipo,
        pagamentoF: dados.pagamentoF,
        especial: dados.especial,
        preco: dados.preco,
        codCurso: dados.codCurso,
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
      duracao: dados.duracao,
      tipo: dados.tipo,
      pagamentoF: dados.pagamentoF,
      especial: dados.especial,
      preco: dados.preco,
      codCurso: dados.codCurso,
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
      duracao: dados.duracao,
      tipo: dados.tipo,
      preco: dados.preco,
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
