import {userRoles} from '@helpers/constants';

export const isRider = user => user?.role === userRoles.RIDER;

export const isClient = user => user?.role === userRoles.CLIENT;

export const isAdminOrRider = user =>
  user?.role === userRoles.ADMIN || user?.role === userRoles.RIDER;

export const isAdmin = user => user?.role === userRoles.ADMIN;
