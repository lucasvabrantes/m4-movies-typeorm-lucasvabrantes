import { z } from "zod";

export const movieSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().int().positive(),
    price: z.number().int().positive(),
});

export const movieCreateSchema = movieSchema.omit({ id: true });
export const movieUpdateSchema = movieCreateSchema.partial();
