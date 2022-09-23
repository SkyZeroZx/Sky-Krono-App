import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkTheme: boolean;
  public navBarPosition: boolean;
  public theme: BehaviorSubject<boolean>;
  public navBar: BehaviorSubject<boolean>;
  public swipeBar: BehaviorSubject<boolean>;

  // Declaramos el evento que escucharemos para generar el boton de instalar la PWA
  public promptEvent;

  constructor() {
    this.darkTheme = this.getLocalStorageItem('darkTheme');
    this.navBarPosition = this.getLocalStorageItem('navBar');
    this.theme = new BehaviorSubject(this.darkTheme);
    this.navBar = new BehaviorSubject(this.navBarPosition);
    this.swipeBar = new BehaviorSubject(false);
  }

  get getInstallPwa() {
    return this.promptEvent;
  }

  getLocalStorageItem(item: string): boolean {
    if (
      localStorage.getItem(item) == null ||
      localStorage.getItem(item) == 'null' ||
      localStorage.getItem(item) == 'false'
    ) {
      return false;
    } else {
      return true;
    }
  }

  setTheme(option: boolean) {
    localStorage.setItem('darkTheme', option.toString());
    this.theme.next(option);
  }

  setNavBar(option: boolean) {
    localStorage.setItem('navBar', option.toString());
    this.navBar.next(option);
  }
}
