import { DataSource } from "typeorm";
import Tag from "../entities/Tag";
import Ad from "../entities/Ad";
import Category from "../entities/Category";

const dataSource = new DataSource({
    type: "sqlite", 
    database : "good_corner.sqlite", 
    entities : [ Ad, Category, Tag], 
    synchronize : true, 
    logging : ["query", "error"]
})

export default dataSource