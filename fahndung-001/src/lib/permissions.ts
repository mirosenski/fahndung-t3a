export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: ["*"],
  USER: [],
};

export type Role = keyof typeof ROLE_PERMISSIONS;
export type Permission = string;
