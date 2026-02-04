const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const routes = require("./routes");
app.use("/api/", routes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT),
);