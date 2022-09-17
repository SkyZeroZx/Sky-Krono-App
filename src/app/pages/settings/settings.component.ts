import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  menuItems: any[] = [
    {
      path: '/gestion-usuarios',
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
  ];
}
