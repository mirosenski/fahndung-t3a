export const ROLE_PERMISSIONS = {
  ADMIN: ['*'],
  EDITOR: ['post:create', 'post:edit', 'post:delete'],
  USER: [],
} as const;
