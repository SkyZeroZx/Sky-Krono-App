import { Component, OnInit } from '@angular/core';
import { ROUTES, ROUTES_VIEWER } from 'src/app/common/menuItems';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
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
    if (role == 'viewer') {
      this.menuItems = ROUTES_VIEWER.filter((menuItem) => menuItem);
    }
  }

  onSwipe(event: Event) {
    event.preventDefault();
    this.themeService.swipeBar.next(false);
  }
}
