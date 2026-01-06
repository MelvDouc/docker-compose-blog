const UserRoles = ["user", "admin"] as const;

type UserRole = typeof UserRoles[number];

export {
  UserRoles,
  type UserRole
};