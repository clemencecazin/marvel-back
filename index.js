require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formidable = require("express-formidable");

const app = express();

app.use(formidable());
app.use(cors());

const userRoutes = require("./routes/user");
const comicsCharactersRoutes = require("./routes/comicsCharacters");

app.use(comicsCharactersRoutes);
app.use(userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

app.get("/", (req, res) => {
    res.json("API Marvel");
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
