require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.json("API Marvel");
});

app.get("/comics", (req, res) => {
    const getComics = async () => {
        try {
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
            );

            // console.log(response.data);
            const comics = response.data;

            res.json({ comics });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getComics();
});

app.get("/characters", (req, res) => {
    const getComics = async () => {
        try {
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
            );

            // console.log(response.data);
            const characters = response.data;

            res.json({ characters });
        } catch (error) {
            console.log(error.message);
        }
    };

    getComics();
});

app.get("/comics/:characterId", (req, res) => {
    const getComics = async () => {
        try {
            const characterId = req.params.characterId;
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
            );

            console.log(response.data);
            const characters = response.data;

            res.json({ characters });
        } catch (error) {
            console.log(error.message);
        }
    };

    getComics();
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
