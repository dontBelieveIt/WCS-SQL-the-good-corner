import { 
    BaseEntity, 
    Column, Entity, 
    ManyToMany, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import Ads from "./Ads";
  
  @Entity()
  class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable:false, 
      default:"other"
    })
    title!: string;
    
  @ManyToMany(() => Ads, ads => ads.category)
  ads! : Ads[]; 
  }
  
  export default Categories