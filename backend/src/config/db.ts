import { DataSource } from "typeorm";
import Ad from "../entities/Ad";
import Category from "../entities/Category";
import Tag from "../entities/Tag";
import * as dotenv from "dotenv";

dotenv.config(); 
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE} = process.env;

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST, 
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;
