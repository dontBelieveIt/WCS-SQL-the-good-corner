import { 
    BaseEntity, 
    Column, Entity, 
    ManyToMany, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import { Ads } from "./Ads";
  
  @Entity()
  class Tags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    title!: string;

    @ManyToMany(() => Ads)
    ads! : Ads[];
  }
  export default Tags