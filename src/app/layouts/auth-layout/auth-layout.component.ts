import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor(private themeService: ThemeService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.themeService.theme.subscribe({
      next: (res) => {
        if (res) {
          this.renderer.removeClass(document.body, 'white-content');
        } else {
          this.renderer.addClass(document.body, 'white-content');
        }
      },
    });
  }
}
