import { 
    BaseEntity, 
    Column, Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn 
  } from "typeorm";
import { Categories } from "./Categories";
import { Tags } from "./Tags";
  
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
    @JoinColumn({
      name: "category_id",
    })
    category! : Categories; 

    @ManyToOne(() => Tags, tag => tag.id)
    @JoinColumn()
    tag! :Tags;
  }
