import { 
    BaseEntity, 
    Column, Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import { Ads } from "./Ads";
  
  @Entity()
  export class Tags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    title!: string;

    @OneToMany(() => Ads, ads => ads.id)
    ads ! : Ads;
  }
  