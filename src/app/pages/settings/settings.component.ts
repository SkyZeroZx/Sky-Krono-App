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
      icon: 'fa-solid fa-bars',
    },
    {
      path: '/schedule',
      title: 'Horarios',
      icon: 'fa-solid fa-clock',
    },
    {
      path: '/chargue',
      title: 'Cargos',
      icon: 'fa-solid fa-user-gear',
    },
    {
      path: '/user-profile',
      title: 'Perfil',
      icon: 'fa-solid fa-id-card',
    },
    {
      path: '/types',
      title: 'Tipos',
      icon: 'fa-brands fa-typo3',
    },
    {
      path: '/licence',
      title: 'Permisos',
      icon: 'fa-solid fa-ticket-simple',
    },
  ];
}
