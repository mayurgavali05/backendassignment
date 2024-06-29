const express = require("express")
const router = express.Router();
const moviescontrollers = require("../controllers/movie-controller")


router.route("/movies").post(moviescontrollers.createMovie)
router.route("/movies").get(moviescontrollers.getMovies)
router.route("/movies/:name").get(moviescontrollers.getMovieByName)
router.route("/movies/:name").put(moviescontrollers.updateMovie)
router.route("/movies/:name").delete(moviescontrollers.deleteMovie)



module.exports = router;