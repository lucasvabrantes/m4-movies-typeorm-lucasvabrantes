import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        const PORT: number = Number(process.env.PORT) || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
