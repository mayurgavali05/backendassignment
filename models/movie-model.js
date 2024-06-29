const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    img: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
})
const Movies = new mongoose.model("Movie", movieSchema)
module.exports = Movies;