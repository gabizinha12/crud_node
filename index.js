const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const server = express();
const db = require("./db");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.MONGODB_URI);

server.get("/", function (req, res, next) {
  res.status(200).send("Hi, It works!");
});

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use("/api", require("./routes"));

server.listen(process.env.PORT || 3000);
