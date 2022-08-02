const jwt = require("jsonwebtoken");
const { secret } = require("../helpers/default.json");

exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
};

exports.verifyJWT = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.headers.authorization.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ Mensagem: "Não foi providenciado nenhum token!" });

  try {
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;

    if (!req.decoded.isDeleted) {
      return res
        .status(403)
        .json({ mensagem: "Conta desativada. Favor de contactar a central!" });
    }
    next();
  } catch (error) {
    res.status(400).json({ mensagem: "Token inválido!" });
  }
};

exports.verifyPermition = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;
    console.log(req.decoded);

    if (req.decoded.rules == "user") {
      return res.status(403).json({ mensagem: "Acesso restrito!" });
    } else if (req.decoded.rules == "user" && !req.decoded.isDeleted) {
      return res
        .status(403)
        .json({ mensagem: "Conta desativada. Favor de contactar a central!" });
    }
    next();
  } catch (error) {
    res.status(400).json({ mensagem: "Token inválido!" });
  }
};
