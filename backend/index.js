const express = require("express");
const app = express();
const financialRouter = require("./router/financial.router");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const coreOptions = {
  origin: "http://localhost:5173",
};

//middle were
app.use(cors(coreOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use("/api/vi/financial", financialRouter);

app.get("/", (req, res) => {
  res.send("<h1>Financial Tracker API</h1>");
});
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
