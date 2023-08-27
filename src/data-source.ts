import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/**.{js,ts}"
    );

    const dbUrl: string | undefined = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw new Error("Missing var: DATABASE_URL");
    }

    if (process.env.NODE_ENV === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};

const AppDataSource: DataSource = new DataSource(dataSourceConfig());

export default AppDataSource;
