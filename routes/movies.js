import { Router } from "express";
import { MovieController } from "../controllers/movie.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.getAllMovies);

moviesRouter.get("/:id", MovieController.getMovieById);

moviesRouter.post("/", MovieController.createMovie);

moviesRouter.patch("/:id", MovieController.editMovie);

moviesRouter.delete("/:id", MovieController.deletemovie);
