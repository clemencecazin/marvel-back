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
            const resultSearch = req.query.title;

            console.log(resultSearch);
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${resultSearch}`
            );

            // console.log(response.data);
            const comics = response.data;

            res.status(200).json({ comics });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getComics();
});

app.get("/characters", (req, res) => {
    const getCharacters = async () => {
        try {
            const limit = req.query.limit || 100; // On assigne à limit la query qui a été rentré côté front
            const skip = req.query.skip || 0;
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}`
            );

            // console.log(response.data);
            const characters = response.data;

            res.status(200).json({ characters });
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    getCharacters();
});

app.get("/comics/:characterId", (req, res) => {
    const getCharacterId = async () => {
        try {
            const characterId = req.params.characterId;
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
            );

            console.log(response.data);
            const characters = response.data;

            res.status(200).json({ characters });
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    getCharacterId();
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
