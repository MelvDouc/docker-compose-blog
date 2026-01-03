import type { IArticle } from "$server/types.js";
import Tag from "$server/entities/Tag.js";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Article implements IArticle {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 255 })
  public title: string;

  @Column("text")
  public content: string;

  @ManyToMany(() => Tag, (tag: Tag) => tag.articles, { cascade: true })
  @JoinTable()
  public tags: Tag[];

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public updatedAt: Date;
}