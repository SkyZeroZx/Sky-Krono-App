import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES_VIEWER } from '../../common/menuItems';
import { AuthService } from '../../services/auth/auth.service';
import { ComponentsMock } from '../components.mock.spec';
import { SidebarComponent } from './sidebar.component';

fdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;

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
    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(ComponentsMock.userStorage));
    fixture.detectChanges();
  });

  it('SidebarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyAuthService = spyOn(authService, 'getItemToken').and.callFake(() => {
      return 'viewer';
    });
    component.ngOnInit();
    expect(spyAuthService).toHaveBeenCalled();
    expect(component.menuItems).toEqual(ROUTES_VIEWER);
  });
});
