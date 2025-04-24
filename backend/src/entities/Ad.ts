import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  owner!: string;

  @Field()
  @Column()
  price!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @Column()
  picture!: string;

  @Field()
  @Column()
  location!: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

export default Ad;