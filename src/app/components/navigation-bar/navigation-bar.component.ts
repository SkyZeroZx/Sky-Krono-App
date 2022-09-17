import { Component, OnInit } from "@angular/core";
import { ROUTES, ROUTES_VIEWER } from "src/app/common/menuItems";
import { AuthService } from "src/app/services/auth/auth.service";
import { ThemeService } from "src/app/services/theme/theme.service";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit {
  darkTheme: boolean = false;
  menuItems: any[] = [];
  constructor(private themeService: ThemeService, private auth: AuthService) {
    this.themeService.theme.subscribe({
      next: (res) => {
        if (res) {
          this.darkTheme = true;
        } else {
          this.darkTheme = false;
        }
      },
    });
  }

  ngOnInit(): void {
    this.tabNavigation();
    switch (this.auth.getItemToken("role")) {
      case "admin":
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        break;
      case "viewer":
        this.menuItems = ROUTES_VIEWER.filter((menuItem) => menuItem);
        break;
      default:
        break;
    }

  }

  tabNavigation() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((clickedTab) => {
      clickedTab.addEventListener("click", () => {
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        clickedTab.classList.add("active");
      });
    });
  }
}
