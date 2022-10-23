import { RouteInfo } from './interfaces';

export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'inicio',
    id: 'sibar-home',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    // TEMPORAL USE CLOCK REPLACE FOR ALARM CLOCK
    path: '/attendance',
    title: 'asistencia',
    id: 'sibar-attendance',
    icon: 'fa-solid fa-clock',
    class: 'azure',
  },
  {
    path: '/contacts',
    title: 'Contactos',
    id: 'sibar-contacts',
    icon: 'fa-solid fa-users',
    class: 'azure',
  },
  {
    path: '/calendar-admin',
    title: 'calendario',
    id: 'sibar-calendar-admin',
    icon: 'fa-regular fa-calendar',
    class: 'yellow',
  },
  {
    path: '/settings',
    title: 'opciones',
    id: 'sibar-settings',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
  {
    path: '/home',
    title: 'inicio',
    id: 'sibar-home',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    path: '/attendance',
    title: 'asistencia',
    id: 'sibar-attendance',
    icon: 'fa-solid fa-clock',
    class: 'azure',
  },
  {
    path: '/contacts',
    title: 'contactos',
    id: 'sibar-contacts',
    icon: 'fa-solid fa-users',
    class: 'azure',
  },
  {
    path: '/calendar-view',
    title: 'calendario',
    id: 'sibar-calendar-view',
    icon: 'fa-regular fa-calendar',
    class: 'yellow',
  },
  {
    path: '/user-profile',
    title: 'perfil',
    id: 'sibar-user-profile',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];
