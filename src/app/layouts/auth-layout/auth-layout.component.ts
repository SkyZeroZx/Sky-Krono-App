import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/services/theme/theme.service";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent implements OnInit {
  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    let body = document.getElementsByTagName("body")[0];
    this.themeService.theme.subscribe({
      next: (res) => {
        if (res) {
          body.classList.remove("white-content");
        } else {
          body.classList.add("white-content");
        }
      },
    });
  }
}
