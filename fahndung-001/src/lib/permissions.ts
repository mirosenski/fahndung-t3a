export const PERMISSIONS = [
  "fahndung.view",
  "fahndung.edit",
  "reports.export",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS = {
  ADMIN: [...PERMISSIONS],
  EDITOR: [PERMISSIONS[0], PERMISSIONS[1]],
  USER: [PERMISSIONS[0]],
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;
