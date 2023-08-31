import { Movie } from "./entities";
import { MovieRepo } from "./interfaces/movie.interface";
import { AppDataSource } from "./data-source";

export const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);
