import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Renderer2, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildrenOutletContexts } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { AdminLayoutComponent } from './admin-layout.component';

fdescribe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let themeService: ThemeService;
  let renderer2: Renderer2;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgbModule,
        CommonModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ChildrenOutletContexts,
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
    localStorage.clear();
    fixture = TestBed.createComponent(AdminLayoutComponent);
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

  it('AdminLayoutComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyEnabledDarkTheme = spyOn(component, 'enabledDarkTheme').and.callThrough();
    const spyEnabledNavBar = spyOn(component, 'enabledNavBar').and.callThrough();
    component.ngOnInit();
    expect(spyEnabledNavBar).toHaveBeenCalled();
    expect(spyEnabledDarkTheme).toHaveBeenCalled();
  });

  it('Validate enabledDarkTheme FALSE', () => {
    component.enabledDarkTheme();
    expect(renderer2.removeClass).toHaveBeenCalledWith(
      jasmine.any(Object),
      'dark-content',
    );
    expect(renderer2.addClass).toHaveBeenCalledWith(jasmine.any(Object), 'white-content');
  });

  it('Validate enabledDarkTheme TRUE', () => {
    themeService.theme = new BehaviorSubject(true);
    component.enabledDarkTheme();
    expect(renderer2.removeClass).toHaveBeenCalledWith(
      jasmine.any(Object),
      'white-content',
    );
    expect(renderer2.addClass).toHaveBeenCalledWith(jasmine.any(Object), 'dark-content');
  });

  it('Validate enabledNavBar', () => {
    themeService.navBar = new BehaviorSubject(true);
    component.enabledNavBar();
    expect(component.isActiveNavBar).toBeTruthy();

    themeService.navBar = new BehaviorSubject(false);
    component.enabledNavBar();
    expect(component.isActiveNavBar).toBeFalsy();
  });
});
