import { RouteInfo } from '@core/interfaces';

const ROUTER_COMMON = [
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
];

export const ROUTES: RouteInfo[] = [
  ...ROUTER_COMMON,
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
  ...ROUTER_COMMON,
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

export const ROUTER_SETTINGS = [
  {
    path: '/manage-users',
    title: 'Usuarios',
    id: 'btn-manage-users',
    icon: 'fa-solid fa-bars',
  },
  {
    path: '/schedule',
    title: 'Horarios',
    id: 'btn-schedule',
    icon: 'fa-solid fa-clock',
  },
  {
    path: '/chargue',
    title: 'Cargos',
    id: 'btn-chargue',
    icon: 'fa-solid fa-user-gear',
  },
  {
    path: '/user-profile',
    title: 'Perfil',
    id: 'btn-user-profile',
    icon: 'fa-solid fa-id-card',
  },
  {
    path: '/types',
    title: 'Tipos',
    id: 'btn-types',
    icon: 'fa-brands fa-typo3',
  },
  {
    path: '/licence',
    title: 'Permisos',
    id: 'btn-licence',
    icon: 'fa-solid fa-ticket-simple',
  },
  {
    path: '/report-attendance',
    title: 'Reportes',
    id: 'btn-reports-attendance',
    icon: 'fa-solid fa-file',
  },
  {
    path: '/charts-attendance',
    title: 'Graficos',
    id: 'btn-charts-attendance',
    icon: 'fa-solid fa-chart-simple',
  },
];
