import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const foundMovie: Movie | null = await movieRepo.findOneBy({
        id: Number(req.params.id),
    });

    if (!foundMovie) throw new AppError("Movie not found", 404);

    res.locals.foundMovie = foundMovie;

    return next();
};
