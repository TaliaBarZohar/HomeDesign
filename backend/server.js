// Talia BarZohar 318257060
// Sagi stav  316584622
// Noa danino 324012277
//Import in NodeJS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//Connecting to a cluster (of mongoDB)
const uri =
  "mongodb+srv://Admin:talia480@cluster0.vadczaj.mongodb.net/H&D?retryWrites=true&w=majority";

//Initialize the schema of mongoDB
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  Category: String,
  price: Number,
});
//Models are created from schemas using the mongoose.model() method
const Product = mongoose.model("product", productSchema);

app.use(cors()); //To app have permission to work with other ports
//get route
app.get("/products", async (req, res, next) => {
  const data = await Product.find({}); //Go to Atlas, take the all records and sent to cilent
  res.send(data);
});

//To handle errors
app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

//connect to cluster (of mongoDB) and The server listening to port 5000
mongoose
  .connect(uri)
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  })
  //If we can't connect to Atlas consle.log the error
  .catch((error) => {
    console.log(error);
  });
