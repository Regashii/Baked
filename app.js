import express from "express";
import mongo from "./mongo.js";
import cors from "cors";
import collection from "./schema.js";
import products from "./products.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await collection.findOne({
      username: username,
      password: password,
    });
    if (check) {
      res.json("exist");
      console.log(check);
    } else {
      res.json("notexist");
      console.log(check);
    }
  } catch (error) {
    res.json(error);
  }
});

app.get("/product", async (req, res) => {
  try {
    const items = await products.find({
      isProcessed: false,
    });
    res.send(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/fetch", async (req, res) => {
  try {
    const grab = await collection.find({});
    res.status(200).json(grab);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3000, (req, res) => {
  console.log("baked APi is running in port 3000");
});
