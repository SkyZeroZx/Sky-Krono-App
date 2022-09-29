import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { slideInAnimation } from '../../common/animations/router-animations';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [slideInAnimation],
})
export class AdminLayoutComponent implements OnInit {
  isActiveNavBar: boolean;

  constructor(
    private themeService: ThemeService,
    private contexts: ChildrenOutletContexts,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.enabledDarkTheme();
    this.enabledNavBar();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  enabledDarkTheme() {
    this.themeService.theme.subscribe({
      next: (res) => {
        if (res) {
          this.renderer.removeClass(document.body, 'white-content');
          this.renderer.addClass(document.body, 'dark-content');
        } else {
          this.renderer.removeClass(document.body, 'dark-content');
          this.renderer.addClass(document.body, 'white-content');
        }
      },
    });
  }

  enabledNavBar() {
    this.themeService.navBar.subscribe({
      next: (res) => {
        this.isActiveNavBar = res;
      },
    });
  }

  onSwipe(event: Event) {
    event.preventDefault();
    this.themeService.setSwipeBar(true);
  }
}
