import { Router } from "express";
import { pagination } from "../middlewares/pagination.middleware";
import { verifyName } from "../middlewares/verifyName.middleware";
import moviesControllers from "../controllers/movies.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movie.schema";
import { verifyIdExists } from "../middlewares/verifyId.middleware";

export const movieRouter: Router = Router();

movieRouter.post(
    "",
    validateBody(movieCreateSchema),
    verifyName,
    moviesControllers.create
);
movieRouter.get("", pagination, moviesControllers.read);

movieRouter.use("/:id", verifyIdExists);
movieRouter.patch(
    "/:id",
    validateBody(movieUpdateSchema),
    verifyName,
    moviesControllers.partialUpdate
);
movieRouter.delete("/:id", moviesControllers.destroy);
