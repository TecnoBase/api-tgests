const crypto = require("crypto");

module.exports = {
  async generateCodeCurso(prefix = "C") {
    return prefix + crypto.randomInt(10000, 99999);
  },
  async generateCodeFormador(prefix = "F") {
    return prefix + crypto.randomInt(10000, 99999);
  },
  async generateCodeFormando(
    data = new Date().getFullYear().toString().substr(-2)
  ) {
    return data + crypto.randomInt(1000, 9999);
  },
  async generateCodeHorario(prefix = "H") {
    return prefix + crypto.randomInt(10000, 99999);
  }, 
  async generateCodeModulo(prefix = "M") {
    return prefix + crypto.randomInt(10000, 99999);
  },
  async generateCodeMunicipio(prefix = "MU", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeInscricao(prefix = "I", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeExpo(prefix = "EP", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodePremiacao(prefix = "PR", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeTBInscricao(prefix = "IT", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeHackathon(prefix = "HT", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeStartup(prefix = "ST", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeFactura(prefix = "FR", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeOnline(prefix = "IO", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeComprovativo(prefix = "IO", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
  async generateCodeVenda(prefix = "VD", size = 2) {
    return prefix + crypto.randomBytes(size).toString("hex").toUpperCase();
  },
};
