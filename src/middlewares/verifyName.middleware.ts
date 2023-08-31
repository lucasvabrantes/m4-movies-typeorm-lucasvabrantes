import { NextFunction, Request, Response } from "express";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";
import { Movie } from "../entities";

export const verifyName = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!req.body.name) return next();
    const nameIsTrue: Movie | null = await movieRepo.findOneBy({
        name: req.body.name,
    });

    console.log(nameIsTrue);
    if (nameIsTrue) {
        throw new AppError("Movie already exists.", 409);
    }

    return next();
};
