import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum AppResources {
  USER = "USER",
  PROFILE = "PROFILE",
  PUBLICATION = "PUBLICATION",
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USER ROLES
  .grant(AppRoles.USER)
  .updateOwn([AppResources.USER])
  .deleteOwn([AppResources.USER])
  .createOwn([AppResources.PROFILE])
  .updateOwn([AppResources.PROFILE])
  .deleteOwn([AppResources.PROFILE])
  .createOwn([AppResources.PUBLICATION])
  .updateOwn([AppResources.PUBLICATION])
  .deleteOwn([AppResources.PUBLICATION])
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.USER)
  .createAny([AppResources.USER])
  .updateAny([AppResources.PROFILE, AppResources.PUBLICATION, AppResources.USER])
  .deleteAny([AppResources.PROFILE, AppResources.PUBLICATION, AppResources.USER]);