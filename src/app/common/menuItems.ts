import { RouteInfo } from './interfaces/routerInfo';

export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Inicio',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    // TEMPORAL USE CLOCK REPLACE FOR ALARM CLOCK
    path: '/attendance',
    title: 'Asistencia',
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
    title: 'Calendario',
    icon: 'fa-regular fa-calendar',
    class: 'yellow',
  },
  {
    path: '/settings',
    title: 'Opciones',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];

export const ROUTES_VIEWER: RouteInfo[] = [
  {
    path: '/home',
    title: 'Inicio',
    icon: 'fa-solid fa-house',
    class: 'azure',
  },
  {
    // TEMPORAL USE CLOCK REPLACE FOR ALARM CLOCK
    path: '/attendance',
    title: 'Asistencia',
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
    path: '/calendar-view',
    title: 'Calendario',
    icon: 'icon-calendar-60',
    class: 'yellow',
  },
  {
    path: '/user-profile',
    title: 'Perfil',
    icon: 'icon-badge',
    class: 'azure',
  },
];
