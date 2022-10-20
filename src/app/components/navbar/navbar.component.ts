import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/common/menuItems';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { User } from '../../common/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  user: User;
  public isCollapsed = true;
  closeResult: string;
  $layer: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.onChangeRouterEvents();
    this.changeOnSwipe();
  }

  changeOnSwipe() {
    this.themeService.swipeBar.subscribe((res) => {
      if (res) {
        this.sidebarToggle();
      } else {
        this.sidebarClose();
      }
    });
  }

  onChangeRouterEvents() {
    this.router.events.subscribe((_event) => {
      this.sidebarClose();
      this.$layer = document.getElementsByClassName('close-layer')[0];
      if (this.$layer) {
        this.$layer.remove();
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 10);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      if (mainPanel?.style !== undefined) {
        setTimeout(function () {
          mainPanel.style.position = '';
        }, 10);
      }
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    if (titlee.includes('contact-detail')) {
      return 'Detalle de Contacto';
    }

    for (let item of this.listTitles) {
      if (item.path === titlee) {
        return item.title;
      }
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }
}
