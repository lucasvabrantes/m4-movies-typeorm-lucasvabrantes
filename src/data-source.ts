import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import "reflect-metadata";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/**.{js,ts}"
    );
    const dbUrl: string | undefined = process.env.DATABASE_URL;
    const nodeEnv: string | undefined = process.env.NODE_ENV;
    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    if (!dbUrl) {
        throw new Error("Missing env var: 'DATABASE_URL'");
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

export { AppDataSource };
