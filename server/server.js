const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

// dotenv.config();
require("dotenv").config();

app.use(
  cors({
    origin: "*", // Allow all origins (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const pin = process.env.PIN;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const ItemSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const Item = mongoose.model("Item", ItemSchema);

// CRUD Operations
// Create
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
// app.put("/items/:id", async (req, res) => {
//   try {
//     console.log("Received ID:", req.params.id);
//     console.log("Received Data:", req.body); // Log incoming request data

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true, // Ensure validation
//     });

//     if (!updatedItem) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     res.json(updatedItem);
//   } catch (error) {
//     console.error("Update Error:", error); // Log error
//     res.status(400).json({ error: error.message });
//   }
// });

// Delete
app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/authenticate", async (req, res) => {
  console.log("pin accessed");
  res.json({ message: pin });
});

app.listen(PORT, () => {
  console.log("listening on PORT 3000");
});
