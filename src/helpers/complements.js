exports.fotos = () => {
  return (
    "image/png" || "image/jpg" || "image/jpeg" || "image/svg" || "image/webp"
  );
};
exports.pdf = () => {
  return "application/zip" || "application/pdf";
};
exports.audio = () => {
  return "audio/webm" || "audio/x-wav" || "audio/mpeg" || "audio/mp4";
};
exports.video = () => {
  return (
    "video/mp4" ||
    "video/webm" ||
    "video/3gpp" ||
    "video/x-ms-wmv" ||
    "video/quicktime" ||
    "video/x-msvideo"
  );
};
