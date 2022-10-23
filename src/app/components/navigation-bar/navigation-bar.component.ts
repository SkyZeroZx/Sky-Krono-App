import { Component, OnInit } from '@angular/core';
import { ROUTES, ROUTES_EMPLOYEE } from 'src/app/common/menuItems';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  darkTheme: boolean = false;
  menuItems: any[] = [];

  constructor(private themeService: ThemeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.tabNavigation();
    this.enabledDarkTheme();
    this.getRouterOfRoles();
  }

  getRouterOfRoles() {
    const role = this.authService.getItemToken('role');
    if (role == 'admin') {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      return;
    }
    if (role == 'employee') {
      this.menuItems = ROUTES_EMPLOYEE.filter((menuItem) => menuItem);
    }
  }

  enabledDarkTheme() {
    this.themeService.theme.subscribe({
      next: (res) => {
        this.darkTheme = res;
      },
    });
  }

  tabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((clickedTab) => {
      clickedTab.addEventListener('click', () => {
        tabs.forEach((tab) => {
          tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
      });
    });
  }
}
