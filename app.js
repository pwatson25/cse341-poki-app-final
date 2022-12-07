const express = require("express");
const cors = require("cors");
const mongodb = require("./config/connect");

const port = process.env.PORT || 3000;
const app = express();

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`POKI-APP API listening on ${port}`);
  }
});
