const express = require("express");
const app = express();
const dotenv = require("dotenv");
const whoisController = require("./controllers/whoisController");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to whois api");
});

app.get("/whois", whoisController);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
