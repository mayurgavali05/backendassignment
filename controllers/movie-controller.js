const Movie = require("../models/movie-model");

const createMovie = async (req, res) => {
  const { name, img, summary } = req.body;
  try {
    const newMovie = new Movie({
      name,
      img,
      summary,
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getMovies = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const movies = await Movie.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Movie.countDocuments();
    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      totalEntities: count,
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const getMovieByName = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.findOne({ name: name });
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateMovie = async (req, res) => {
  const { name } = req.params;
  const { img, summary } = req.body;
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { name: name },
      { $set: { img, summary } },
      { new: true }
    );
    if (!updatedMovie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(updatedMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteMovie = async (req, res) => {
  const { name } = req.params;
  try {
    const deletedMovie = await Movie.findOneAndDelete({ name: name });
    if (!deletedMovie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json({ msg: 'Movie removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
module.exports = { createMovie, getMovies, getMovieByName, updateMovie, deleteMovie }