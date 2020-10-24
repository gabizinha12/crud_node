const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv").config({ path: "./env" });
const server = express();

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("the database is working");
  })
  .catch((err) => {
    console.error(err);
  });
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use("/api", require("./routes"));

server.listen(process.env.PORT || 3000);
