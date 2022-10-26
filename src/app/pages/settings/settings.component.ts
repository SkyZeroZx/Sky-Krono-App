import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  menuItems: any[] = [
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
  ];
}
