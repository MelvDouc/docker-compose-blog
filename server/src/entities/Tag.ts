import Article from "$server/entities/Article.js";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 50, unique: true })
  public name: string;

  @ManyToMany(() => Article, (article: Article) => article.tags)
  public articles: Article[];
}