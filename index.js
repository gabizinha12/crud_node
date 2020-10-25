const env = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./db");
const server = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    "mongodb+srv://softwrap:softwrap@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  });

server.get("/", function (req, res, next) {
  res.status(200).send("Hi, It works!");
});
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use("/api", require("./routes"));

const port = process.env.PORT || 1337;
server.listen(port);
