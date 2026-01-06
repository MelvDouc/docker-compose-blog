import Tag from "$server/entities/Tag.js";
import User from "$server/entities/User.ts";
import type { IArticle } from "@blog/common";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Article implements IArticle {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 255 })
  public title: string;

  @Column("text")
  public content: string;

  @ManyToMany(() => Tag, (tag: Tag) => tag.articles, { cascade: true })
  @JoinTable({ name: "article_tags" })
  public tags: Tag[];

  @ManyToOne(() => User, (user) => user.articles, { onDelete: "SET NULL" })
  public user: User | null;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public updatedAt: Date;
}