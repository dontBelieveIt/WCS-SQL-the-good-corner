import { 
    BaseEntity, 
    Column, Entity, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  
  @Entity()
  export class Tags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    title!: string;
  }
  