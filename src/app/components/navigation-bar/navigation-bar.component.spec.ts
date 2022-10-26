import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES, ROUTES_EMPLOYEE } from '../../common/menuItems';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ComponentsMock } from '../components.mock.spec';
import { NavigationBarComponent } from './navigation-bar.component';

fdescribe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let authService: AuthService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'calendar-admin', component: SettingsComponent },
        ]),
        CommonModule,
        RouterModule,
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthService, ThemeService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    authService = TestBed.inject(AuthService);
    themeService = TestBed.inject(ThemeService);

    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(ComponentsMock.userStorage));
    fixture.detectChanges();
  });

  it('NavigationBarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyTabNavigation = spyOn(component, 'tabNavigation').and.callThrough();
    const spyEnabledDarkTheme = spyOn(component, 'enabledDarkTheme').and.callThrough();
    const spyGetRouterOfRoles = spyOn(component, 'getRouterOfRoles').and.callThrough();
    component.ngOnInit();
    expect(spyTabNavigation).toHaveBeenCalled();
    expect(spyEnabledDarkTheme).toHaveBeenCalled();
    expect(spyGetRouterOfRoles).toHaveBeenCalled();
  });

  it('Validate enabledDarkTheme', () => {
    themeService.setTheme(true);
    component.enabledDarkTheme();
    expect(component.darkTheme).toBeTruthy();
    themeService.setTheme(false);
    component.enabledDarkTheme();
    expect(component.darkTheme).toBeFalsy();
  });

  it('Validate getRouterOfRoles', () => {
    component.getRouterOfRoles();
    expect(component.menuItems).toEqual(ROUTES);
    spyOn(authService, 'getItemToken').and.callFake(() => {
      return 'employee';
    });
    component.getRouterOfRoles();
    expect(component.menuItems).toEqual(ROUTES_EMPLOYEE);
  });

  it('Validate tabNavigation', fakeAsync(() => {
    const spyDocument = spyOn(document, 'querySelectorAll').and.callThrough();
    component.tabNavigation();
    expect(spyDocument).toHaveBeenCalled();
    const element = fixture.nativeElement;
    const navigationBarElement = element.querySelector('.yellow');
    const spyRemoveClass = spyOn(
      navigationBarElement.classList,
      'remove',
    ).and.callThrough();
    navigationBarElement.click();
    tick(1000);
    fixture.detectChanges();
    expect(spyRemoveClass).toHaveBeenCalled();
  }));
});
