import { 
    BaseEntity, 
    Column, Entity, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import { Ads } from "./Ads";
  
  @Entity()
  export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    title!: string;
    
  @OneToOne(() => Ads, ads => ads.id)
  ads! : Ads; 
  }
  