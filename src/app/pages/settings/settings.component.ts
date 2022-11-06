import { Component } from '@angular/core';
import { ROUTER_SETTINGS } from '@core/routes/menuItems';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  menuItems: any[] = ROUTER_SETTINGS;
}
