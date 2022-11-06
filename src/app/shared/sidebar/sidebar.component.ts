import { Component, OnInit } from '@angular/core';
import { ROUTES, ROUTES_EMPLOYEE } from '@core/routes/menuItems';
import { AuthService } from '@service/auth/auth.service';
import { ThemeService } from '@service/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    const role = this.authService.getItemToken('role');
    if (role == 'admin') {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      return;
    }
    if (role == 'employee') {
      this.menuItems = ROUTES_EMPLOYEE.filter((menuItem) => menuItem);
    }
  }

  onSwipe(event: Event) {
    event.preventDefault();
    this.themeService.setSwipeBar(false);
  }
}
