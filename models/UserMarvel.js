const mongoose = require("mongoose");

const UserMarvel = mongoose.model("UserMarvel", {
    email: {
        unique: true, // Je peux rentrer un  user que si cet e-mail n'existe pas
        type: String,
    },
    account: {
        username: {
            required: true, // Je peux pas créer un nouveau user si pas username
            type: String,
        },
    },
    token: String,
    hash: String,
    salt: String,
});

module.exports = UserMarvel;
