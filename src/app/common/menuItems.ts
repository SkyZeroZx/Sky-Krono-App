import { RouteInfo } from './interfaces';

export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'inicio',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    // TEMPORAL USE CLOCK REPLACE FOR ALARM CLOCK
    path: '/attendance',
    title: 'asistencia',
    icon: 'fa-solid fa-clock',
    class: 'azure',
  },
  {
    path: '/contacts',
    title: 'Contactos',
    icon: 'fa-solid fa-users',
    class: 'azure',
  },
  {
    path: '/calendar-admin',
    title: 'calendario',
    icon: 'fa-regular fa-calendar',
    class: 'yellow',
  },
  {
    path: '/settings',
    title: 'opciones',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
  {
    path: '/home',
    title: 'inicio',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    path: '/attendance',
    title: 'asistencia',
    icon: 'fa-solid fa-clock',
    class: 'azure',
  },
  {
    path: '/contacts',
    title: 'contactos',
    icon: 'fa-solid fa-users',
    class: 'azure',
  },
  {
    path: '/calendar-view',
    title: 'calendario',
    icon: 'fa-regular fa-calendar',
    class: 'yellow',
  },
  {
    path: '/user-profile',
    title: 'perfil',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];
