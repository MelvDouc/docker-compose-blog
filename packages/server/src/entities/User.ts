import Article from "$server/entities/Article.ts";
import { UserRoles, type IUser, type UserRole } from "@blog/common";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export default class User implements IUser {
  @PrimaryColumn({ type: "text" })
  public email: string;

  @Column("varchar", { length: 20, unique: true })
  public username: string;

  @Column("text")
  public password: string;

  @Column("enum", { enum: UserRoles, default: "user" })
  public role: UserRole;

  @OneToMany(() => Article, (article) => article.user)
  public articles: Article[];

  @Column("bool", { default: false })
  public verified: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;
}