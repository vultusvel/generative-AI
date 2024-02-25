const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const envData = {
  mongoKey: process.env.MONGODB_PASS,
  mongoUser: process.env.MONGODB_USER,
  PORT: process.env.PORT
}

dotenv.config();
const app = express();

app.listen(envData.PORT, () => {
  console.log(`Server started on ${envData.PORT} port`);
});

app.use(cors());

app.use("/", routes);
app.use(express.json());



const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${envData.mongoUser}:${envData.mongoKey}@products.cdijfk0.mongodb.net/?retryWrites=true&w=majority&appName=Products`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();