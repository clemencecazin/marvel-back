const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", (req, res) => {
    const getComics = async () => {
        try {
            const resultSearch = req.query.title;

            // Get the comics by research title
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${resultSearch}`
            );

            const comics = response.data;

            res.status(200).json({ comics });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getComics();
});

router.get("/charactersFav", (req, res) => {
    const getCharactersFav = async () => {
        try {
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
            );

            const characters = response.data;

            res.status(200).json({ characters });
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    getCharactersFav();
});

router.get("/characters", (req, res) => {
    const getCharacters = async () => {
        try {
            const limit = req.query.limit || 100;
            const skip = req.query.skip || 0;

            const resultSearch = req.query.name;

            // Get the characters by name
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${resultSearch}&skip=${skip}&limit=${limit}`
            );

            const characters = response.data;

            res.status(200).json({ characters });
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    getCharacters();
});

router.get("/comics/:characterId", (req, res) => {
    const getCharacterId = async () => {
        try {
            const characterId = req.params.characterId;

            // Get characters details by Id
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

module.exports = router;
