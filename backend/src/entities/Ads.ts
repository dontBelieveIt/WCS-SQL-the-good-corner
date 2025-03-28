import { 
    BaseEntity, 
    Column, Entity, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
  } from "typeorm";
import Categories from "./Categories";
import Tags from "./Tags";
  
  @Entity()
  export class Ads extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    title!: string;
  
    @Column()
    description!: string;
  
    @Column()
    owner!: string;
  
    @Column()
    price!: number;

    @Column()
    picture!: string; 

    @Column()
    location!: string;

    @Column()
    createdAt!: number; 
    
    @ManyToOne(() => Categories, category => category.ads)
    @JoinTable({
      name: "category_id",
    })
    category! : Categories; 

    @ManyToMany(() => Tags, tag => tag.ads)
    @JoinTable({
      name: "ads_tags",
        joinColumns: [{ name: "ad_id" }],
        inverseJoinColumns: [{ name: "tag_id" }]
    })
    tag! :Tags[];
  }
export default Ads