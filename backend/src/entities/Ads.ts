import { 
    BaseEntity, 
    Column, Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToOne, 
    OneToMany, 
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
    
    @OneToOne(() => Categories, category => category.id)
    @JoinColumn()
    category! : Categories; 

    @ManyToOne(() => Tags, tag => tag.id)
    @JoinTable()
    tag! :Tags;
  }
  