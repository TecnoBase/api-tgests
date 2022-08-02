const multer = require("multer");
const path = require("path");

const uploadIMG = multer({
  dest: process.env.DIR_UPLOAD_IMG,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, process.env.DIR_UPLOAD_IMG));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/webp",
    ].find((fa) => fa == file.mimetype);

    if (ext) {
      return cb(null, true);
    }

    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 1048576) {
      return cb("Formato de arquivo não suportado!");
    }
    return cb(null, false);
  },
});
const uploadPDF = multer({
  dest: process.env.DIR_UPLOAD_PDF,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, process.env.DIR_UPLOAD_PDF));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname +
          "_" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fieldNameSize: 300,
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = ["application/zip", "application/pdf"].find(
      (fa) => fa == file.mimetype
    );

    if (ext) {
      return cb(null, true);
    }

    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 1048576) {
      return cb("Formato de arquivo não suportado!");
    }
    return cb(null, false);
  },
});
const uploadAudio = multer({
  dest: process.env.DIR_UPLOAD_AUDIO,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, process.env.DIR_UPLOAD_AUDIO));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname +
          "_" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fieldNameSize: 300,
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = ["audio/webm", "audio/x-wav", "audio/mpeg", "audio/mp4"].find(
      (fa) => fa == file.mimetype
    );

    if (ext) {
      return cb(null, true);
    }

    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 1048576) {
      return cb(new Error("..."));
    }
    return cb(null, false);
  },
});
const uploadVideo = multer({
  dest: process.env.DIR_UPLOAD_VIDEO,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, process.env.DIR_UPLOAD_VIDEO));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname +
          "_" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fieldNameSize: 300,
    fileSize: 1048576000,
  },
  fileFilter: (req, file, cb) => {
    const ext = [
      "video/mp4",
      "video/webm",
      "video/3gpp",
      "video/x-ms-wmv",
      "video/quicktime",
      "video/x-msvideo",
    ].find((fa) => fa == file.mimetype);

    if (ext) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

// Upload Single File
exports.uploadSingleIMG = uploadIMG.single("image");
exports.uploadSinglePDF = uploadPDF.single("file");
exports.uploadSingleAudio = uploadAudio.single("audio");
exports.uploadSingleVideo = uploadVideo.single("video");

// Upload Multy File
exports.uploadMultyIMG = uploadIMG.array("images", 3);
exports.uploadMultyPDF = uploadPDF.array("files", 6);
exports.uploadMultyAudio = uploadAudio.array("audios", 5);
exports.uploadMultyVideo = uploadVideo.array("videos", 12);
