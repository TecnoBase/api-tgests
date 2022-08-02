const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connected to database"))
  .catch((err) => console.log(err));
