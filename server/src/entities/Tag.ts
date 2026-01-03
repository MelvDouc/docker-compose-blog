import type { ITag } from "$server/types.js";
import Article from "$server/entities/Article.js";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tag implements ITag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 50, unique: true })
  public name: string;

  @ManyToMany(() => Article, (article: Article) => article.tags)
  public articles: Article[];
}