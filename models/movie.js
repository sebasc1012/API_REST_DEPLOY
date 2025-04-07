import movies from "../movies.json" with { type: "json" };
import { randomUUID } from "node:crypto";

export class MovieModel {
    static async  getAllMovies ({genre}) {
        if (genre) {
            return movies.filter((movie)=> movie.Genre.toLowerCase().includes(genre.toLowerCase()));
        }
return movies
    }

    static async getMovieById({id}) {
        const movie = movies.find((movie) => movie.imdbID === id);
        return movie
    }


    static async createMovie({movie}) {
        const newMovie = {
        imdbID: randomUUID(), 
        ...movie
    };
    movies.push(newMovie);

    return newMovie
    }


    static async deleteMovie({id}) {
        const movieFind = movies.findIndex((movie) => movie.imdbID === id);
        if (movieFind === -1) {
            return null;
        }
        const deleteMovie = movies.splice(movieFind, 1);
        return deleteMovie
    }

    static async updateMovie({id, movie}) {
        const movieFind = movies.findIndex((movie) => movie.imdbID === id);
        if (movieFind === -1) {
            return null;
        }
        const updateMovie = {
            ...movies[movieFind],
            ...movie,
        };
        movies[movieFind] = updateMovie;
        return updateMovie
    }
}