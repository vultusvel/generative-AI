const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const OpenAI = require("openai");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/auth", routes);
app.use(express.json());


app.post("/api/data", async (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  const imageUrl = await processReceivedData(data)
  res.send({ imageUrl })
});

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


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function processReceivedData(data,res) {
    const fullSentence = data.toSend.message;
  
    const startPhrase = "So in the T-shirt you want: ";
    const endPhrase = "If you are agree please click to the button above.";
  
    const startIndex = fullSentence.indexOf(startPhrase) + startPhrase.length;
    const endIndex = fullSentence.indexOf(endPhrase);
  
    const result = fullSentence.substring(startIndex, endIndex).trim();  
    const imageUrl = await generate(result, res);
    return imageUrl
  }
  
  async function generate(resData, res) {
    try {
      const image = await openai.images.generate({
        model: "dall-e-2",
        prompt: resData,
        n: 1,
        size: "512x512"
      });
      const imageUrl = image.data[0].url;
      return imageUrl
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
