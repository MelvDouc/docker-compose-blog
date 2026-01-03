import { UserRoles, type UserRole } from "$server/imports.js";
import type { IUser } from "$server/types.js";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class User implements IUser {
  @PrimaryColumn({ type: "text" })
  public email: string;

  @Column("varchar", { length: 20, unique: true })
  public username: string;

  @Column("text")
  public password: string;

  @Column("enum", { enum: UserRoles, default: "user" })
  public role: UserRole;

  @Column("bool", { default: false })
  public verified: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;
}