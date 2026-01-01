import { UserRoles, type UserRole } from "$server/core/user-roles.js";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn({ type: "text" })
  public email: string;

  @Column("text")
  public password: string;

  @Column("enum", { enum: UserRoles, default: "user" })
  public role: UserRole;

  @Column("bool", { default: false })
  public active: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;
}