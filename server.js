const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require ("dotenv");
dotenv.config()

const USERMDB = process.env.USERMDB;
const passw = process.env.PASSWORD;
const port = process.env.PORT;

const mongoose = require("mongoose");
const url =
  `mongodb+srv://${USERMDB}:${passw}@cursointro.yg5v5ef.mongodb.net/?retryWrites=true&w=majority`;

  const routes = require("./routes/index");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

const connectMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log(
        "Servidor escuchando en el puerto 3000 y la base de datos conectada"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();