const { generateCodeMunicipio } = require("../../helpers/generateCode");
const model = require("../../models/municipios");
const controller = {};

controller.listar = async (req, res) => {
  try {
    const { ...props } = req.query;
    const dados = await model
      .find({ isDeleted: true, ...props })
      .sort({ descricao: "asc" });
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
    const codMunicipio = await generateCodeMunicipio();
    if (await model.findOne({ codMunicipio })) {
      codMunicipio = await generateCodeMunicipio();
    }

    const { descricao, provincia } = req.body;
    if (await model.findOne({ descricao, provincia, estado: true }))
      return res.status(409).json({ mensagem: "Este registro já existe!" });

    const dados = await model.create({ ...req.body, codMunicipio });
    const serialize = {
      _id: dados._id,
      descricao: dados.descricao,
      provincia: dados.provincia,
      codMunicipio: dados.codMunicipio,
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
      descricao: dados.descricao,
      provincia: dados.provincia,
      codMunicipio: dados.codMunicipio,
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
      descricao: dados.descricao,
      provincia: dados.provincia,
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
