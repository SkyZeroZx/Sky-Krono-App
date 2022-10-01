import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutes } from './auth-layout.routing';

fdescribe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;
  let themeService: ThemeService;
  let renderer2: Renderer2;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgbModule,
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ThemeService,
        FormBuilder,
        Renderer2,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    // Renderer2 to for fixture instance component
    renderer2 = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>,
    );
    // Functions of renderer2
    spyOn(renderer2, 'addClass').and.callThrough();
    spyOn(renderer2, 'removeClass').and.callThrough();
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('AuthLayoutComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit Dark Theme false', () => {
    // themeService.theme = new BehaviorSubject(true);
    // Dark Theme is FALSE
    spyOnProperty(themeService, 'theme', 'get').and.returnValue(of(false));
    component.ngOnInit();
    expect(renderer2.addClass).toHaveBeenCalledWith(jasmine.any(Object), 'white-content');
  });

  it('Validate ngOnInit Dark Theme true', () => {
    // Dark Theme is TRUE
    themeService.setTheme(true);
    component.ngOnInit();
    expect(renderer2.removeClass).toHaveBeenCalledWith(
      jasmine.any(Object),
      'white-content',
    );
  });
});
