import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme$: BehaviorSubject<boolean>;
  private navBar$: BehaviorSubject<boolean>;
  private swipeBar$: BehaviorSubject<boolean>;

  // Declare event of listening for install pwa in toggle in user options
  public promptEvent: any;

  constructor() {
    this.theme$ = new BehaviorSubject(this.getLocalStorageItem('darkTheme'));
    this.navBar$ = new BehaviorSubject(this.getLocalStorageItem('navBar'));
    this.swipeBar$ = new BehaviorSubject(false);
  }

  get getInstallPwa() {
    return this.promptEvent;
  }

  get swipeBar() {
    return this.swipeBar$.asObservable();
  }

  get theme() {
    return this.theme$.asObservable();
  }

  get navBar() {
    return this.navBar$.asObservable();
  }

  setSwipeBar(value: boolean) {
    this.swipeBar$.next(value);
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
    this.theme$.next(option);
  }

  setNavBar(option: boolean) {
    localStorage.setItem('navBar', option.toString());
    this.navBar$.next(option);
  }
}
