import { 
    BaseEntity, 
    Column, Entity, 
    JoinTable, 
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

    @ManyToOne(() => Tags, tag => tag.id)
    @JoinTable({
      name: "tag_id"
    })
    tag! :Tags[];
  }
export default Ads