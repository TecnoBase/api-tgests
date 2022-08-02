const router = require("express").Router();
const { verifyJWT } = require("../../middleware/auth");
const PdfPrinter = require("pdfmake");

// var fonts = {
//   Courier: {
//     normal: "Courier",
//     bold: "Courier-Bold",
//     italics: "Courier-Oblique",
//     bolditalics: "Courier-BoldOblique",
//   },
//   Helvetica: {
//     normal: "Helvetica",
//     bold: "Helvetica-Bold",
//     italics: "Helvetica-Oblique",
//     bolditalics: "Helvetica-BoldOblique",
//   },
//   Times: {
//     normal: "Times-Roman",
//     bold: "Times-Bold",
//     italics: "Times-Oblique",
//     bolditalics: "Times-BoldOblique",
//   },
// };

// const PdfPrinter = require("pdfmake");
// const printer = new PDFPrinter();
// const fs = require ("fs");
// var DocDefinition = {
//   content: ["First paragrath", "dfgfhfghrghfhghhtyt"],
//   defaultstyle: {
//     font: "Helvetica"
//   }
// };

// pdfMake.createPdf(docDefition).download("document.pdf");

const {
  listar,
  salvar,
  editar,
  deletar,
  findOne,
} = require("../../controller/definicoes/Tickets");

// router.get("/", async (req, res) => {
//   var fonts = {
//     Helvetica: {
//       normal: "Helvetica",
//       bold: "Helvetica-Bold",
//       italics: "Helvetica-Oblique",
//       bolditalics: "Helvetica-BoldOblique",
//     },
//   };
//   const printer = new PdfPrinter();

//   const pdfDoc = printer.createPdfKitDocument()
// });
router.post("/", salvar);
router.put("/:id", editar);
router.delete("/:id", deletar);
router.get("/:id", findOne);

module.exports = (app) => app.use("/facturas", verifyJWT, router);
