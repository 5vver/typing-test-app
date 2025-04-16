export const saltRounds = 10;

export const usersRepositoriesConstants = {
  users: 'USERS_REPOSITORY',
  usersStatistics: 'USERS_STATISTICS_REPOSITORY',
  usersPictures: 'USERS_PICTURES_REPOSITORY',
} as const;

export const usersRoles = {
  user: 'user',
  admin: 'admin',
} as const;
