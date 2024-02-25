const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/auth", routes);
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@products.cdijfk0.mongodb.net/?retryWrites=true&w=majority&appName=Products`,
    );
    app.listen(process.env.PORT, () => {
      console.log(`Server started on ${process.env.PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
