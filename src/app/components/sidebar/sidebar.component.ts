import { Component, OnInit } from "@angular/core";
import { ROUTES, ROUTES_VIEWER } from "src/app/common/menuItems";
import { AuthService } from "src/app/services/auth/auth.service";
 


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private auth: AuthService) {}

  ngOnInit() {
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
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
