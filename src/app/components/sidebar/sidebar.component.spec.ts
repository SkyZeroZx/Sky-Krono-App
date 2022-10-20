import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES_EMPLOYEE } from '../../common/menuItems';

import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ComponentsMock } from '../components.mock.spec';
import { SidebarComponent } from './sidebar.component';

fdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;
  let themeService: ThemeService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(ComponentsMock.userStorage));
    fixture = TestBed.createComponent(SidebarComponent);
    authService = TestBed.inject(AuthService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(ComponentsMock.userStorage));
    fixture.detectChanges();
  });

  it('SidebarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyAuthService = spyOn(authService, 'getItemToken').and.callFake(() => {
      return 'employee';
    });
    component.ngOnInit();
    expect(spyAuthService).toHaveBeenCalled();
    expect(component.menuItems).toEqual(ROUTES_EMPLOYEE);
  });

  it('Validate onSwipe', () => {
    let mockEvent: Event = new Event('swipe');
    const spySetSwipeBar = spyOn(themeService, 'setSwipeBar').and.callThrough();
    component.onSwipe(mockEvent);
    expect(spySetSwipeBar).toHaveBeenCalled();
  });
});
