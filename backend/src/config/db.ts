import { DataSource } from "typeorm";
import { Ads } from "../entities/Ads"; 
import { Categories } from "../entities/Categories";
import { Tags } from "../entities/Tags";

export const dataSource = new DataSource({
    type: "sqlite", 
    database : "good_corner.sqlite", 
    entities : [Ads, Categories, Tags],
    synchronize : true 
})