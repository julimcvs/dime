import { DataSource } from "typeorm";
import dbConfig from "./database.config";

const datasource = new DataSource(dbConfig());
datasource.initialize().then(() => console.log(__dirname));
export default datasource;