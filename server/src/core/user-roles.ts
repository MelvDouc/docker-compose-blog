export const UserRoles = ["user", "admin"] as const;

export type UserRole = typeof UserRoles[number];