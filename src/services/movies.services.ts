import { Movie } from "../entities";
import {
    MovieCreate,
    MovieRead,
    MovieUpdate,
} from "../interfaces/movie.interface";
import {
    Pagination,
    PaginationParams,
} from "../interfaces/pagination.interfaces";
import { movieRepo } from "../repositories";
const create = async (payload: MovieCreate): Promise<Movie> => {
    return await movieRepo.save(payload);
};
const read = async (
    paginationParams: PaginationParams
): Promise<Pagination> => {
    const { page, perPage, prevPage, nextPage, sort, order } = paginationParams;
    const [movies, count]: Array<MovieRead | number> =
        await movieRepo.findAndCount({
            order: { [sort]: order },
            skip: page,
            take: perPage,
        });

    return {
        prevPage: page <= 1 ? null : prevPage,
        nextPage: count - page <= perPage ? null : nextPage,
        count,
        data: movies,
    };
};

const partialUpdate = async (
    movie: MovieUpdate,
    payload: MovieUpdate
): Promise<Movie> => {
    return await movieRepo.save({ ...movie, ...payload });
};

const destroy = async (movie: Movie): Promise<void> => {
    await movieRepo.remove(movie);
};

export default { create, read, partialUpdate, destroy };
