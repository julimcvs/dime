import { DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export default (): DataSourceOptions => ({
  type: "postgres",
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: process.env.NODE_ENV !== "prod",
  maxQueryExecutionTime: 10_000,
  entities: [__dirname + "/../../model/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../../model/migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  cache: {
    type: "database",
    duration: 3000
  }
})