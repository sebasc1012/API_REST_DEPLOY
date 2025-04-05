import { Router } from "express";
import { validateSquema, validateEditSquema } from "../squemas/movieSquema.js";
import { MovieModel } from "../models/movie.js";

export const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  const { genre } = req.query;
  const movies = await MovieModel.getAllMovies({ genre });
  res.json(movies);
});

moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getMovieById({ id });
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

moviesRouter.post("/", async (req, res) => {
  const result = validateSquema(req.body);
  if (result.error) {
    return res.status(422).json({ message: JSON.parse(result.error.message) });
  }
  const newMovie = await MovieModel.createMovie({ movie: result.data });
  res.status(201).json(newMovie);
});

moviesRouter.patch("/:id", async (req, res) => {
  const resul = validateEditSquema(req.body);
  if (resul.error) {
    return res.status(422).json({ message: JSON.parse(resul.error.message) });
  }
  const { id } = req.params;

  const updateMovie = await MovieModel.updateMovie({ id, movie: resul.data });
  if (!updateMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json(updateMovie);
});

moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteMovie = await MovieModel.deleteMovie({ id });

  if (!deleteMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(204).json({ message: "Movie deleted" });
});
