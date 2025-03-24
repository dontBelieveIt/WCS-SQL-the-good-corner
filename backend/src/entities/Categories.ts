import { 
    BaseEntity, 
    Column, Entity, 
    OneToMany, 
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
    
  @OneToMany(() => Ads, ads => ads.category)
  ads! : Ads[]; 
  }
  
  export default Categories