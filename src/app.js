const dotenv = require("dotenv");

dotenv.config();
const app = require("./server");
require("./database/db");
const port = process.env.PORT || process.env.ALTERN_PORT;

app.listen(port, () => console.log("Servidor rodando na porta http://localhost:" + port));

