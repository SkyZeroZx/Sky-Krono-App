import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ComponentsMock } from '../components.mock.spec';
import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let themeService: ThemeService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    events: of(null),
  };
  let dummyElement = document.getElementsByTagName('nav');

  document.getElementById = jasmine
    .createSpy('HTML Element')
    .and.returnValue(dummyElement);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, CommonModule, NgbModule],
      providers: [AuthService, { provide: Router, useValue: mockRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    authService = TestBed.inject(AuthService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(ComponentsMock.userStorage));
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('NavbarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyOnChangeRouterEvents = spyOn(
      component,
      'onChangeRouterEvents',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyOnChangeRouterEvents).toHaveBeenCalled();
  });

  it('Valdite onLogout', () => {
    const spyLogout = spyOn(authService, 'logout').and.callThrough();
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'removeItem').and.callThrough();
    component.onLogout();
    expect(spyLogout).toHaveBeenCalled();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/login']);
    expect(spyLocalStorage).toHaveBeenCalled();
  });

  it('Validate onChangeRouterEvents', () => {
    // previous mock router event
    const spySidebarClose = spyOn(component, 'sidebarClose').and.callFake(() => {});

    const spyDocumentGetElementsByClassName = spyOn(
      document,
      'getElementsByClassName',
    ).and.returnValue(dummyElement);
    fixture.detectChanges();
    component.onChangeRouterEvents();
    component.$layer = true;
    fixture.detectChanges();
    expect(spySidebarClose).toHaveBeenCalled();
    expect(spyDocumentGetElementsByClassName).toHaveBeenCalled();
  });

  it('Validate collapse', () => {
    component.collapse();
    expect(component.isCollapsed).toBeFalsy();
    component.collapse();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('Validate sidebarOpen ', () => {
    const spyGetElementsByClassName = spyOn(
      document,
      'getElementsByClassName',
    ).and.returnValue(dummyElement);
    const spyGetElementsByTagName = spyOn(
      document,
      'getElementsByTagName',
    ).and.callThrough();
    window.innerWidth = 800;
    component.sidebarOpen();
    expect(spyGetElementsByClassName).toHaveBeenCalled();
    expect(spyGetElementsByTagName).toHaveBeenCalled();
  });

  it('Validate sidebarClose', () => {
    const spyGetElementsByTagName = spyOn(
      document,
      'getElementsByTagName',
    ).and.callThrough();
    const spyGetElementsByClassName = spyOn(
      document,
      'getElementsByClassName',
    ).and.returnValue(dummyElement);
    component.sidebarClose();
    window.innerWidth = 800;
    component.sidebarOpen();
    expect(spyGetElementsByClassName).toHaveBeenCalled();
    expect(spyGetElementsByTagName).toHaveBeenCalled();
  });

  it('Validate sidebarToggle', () => {
    spyOn(document, 'getElementsByTagName').and.callThrough();
    spyOn(document, 'getElementsByClassName').and.returnValue(dummyElement);
    const spySideBarOpen = spyOn(component, 'sidebarOpen').and.callThrough();
    const spySideBarClose = spyOn(component, 'sidebarClose').and.returnValue(null);
    component.sidebarToggle();
    expect(spySideBarOpen).toHaveBeenCalled();
    expect(spySideBarClose).not.toHaveBeenCalled();
    component.sidebarToggle();
    expect(spySideBarClose).toHaveBeenCalled();
    expect(spySideBarOpen).not.toHaveBeenCalledTimes(2);
  });

  it('Validate getTitle', () => {
    spyOn(component.location, 'prepareExternalUrl').and.returnValue('#/home');
    expect(component.getTitle()).toEqual('inicio');

    spyOn(component.location, 'prepareExternalUrl').and.returnValue('contact-detail');
    expect(component.getTitle()).toEqual('Detalle de Contacto');
  });

  it('Validate changeOnSwipe', () => {
    spyOnProperty(themeService, 'swipeBar', 'get').and.returnValue(of(true));
    const spySideBarToggle = spyOn(component, 'sidebarToggle').and.returnValue(null);
    component.changeOnSwipe();
    expect(spySideBarToggle).toHaveBeenCalled();

    spyOnProperty(themeService, 'swipeBar', 'get').and.returnValue(of(false));
    const spySidebarClose = spyOn(component, 'sidebarClose').and.returnValue(null);
    component.changeOnSwipe();
    expect(spySideBarToggle).not.toHaveBeenCalledTimes(2);
    expect(spySidebarClose).toHaveBeenCalled();
  });
});
