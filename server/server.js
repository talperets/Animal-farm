import express from "express";
import crypto from "crypto";
import cors from "cors";
import Chance from "chance";

const app = express();
const chance = Chance();
const animals = [...Array(600).keys()].map((id) => {
  return {
    id,
    type: chance.city(),
    age: chance.age(),
    name: chance.company(),
    address: chance.address(),
  };
});
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.get("/", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const result = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(result);
});

app.listen(3003, () => {
  console.log("Server is up and running");
});
