const express = require("express");
const app = express();
const PORT = 8080;

app.get("/api/home", (req, res) => {
  res.json("Welcome to the home page!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});