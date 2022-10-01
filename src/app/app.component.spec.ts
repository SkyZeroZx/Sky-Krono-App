import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme/theme.service';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let swUpdate: SwUpdate;
  let themeService: ThemeService;
  let mockSwUpdate: any = {
    versionUpdates: of(null),
  };
  let mockEvent: any = {
    preventDefault() {
      return;
    },
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        FormsModule,
        RouterTestingModule,
        ServiceWorkerModule,
      ],
      providers: [
        ToastrService,
        ReactiveFormsModule,
        ThemeService,
        { provide: SwUpdate, useValue: mockSwUpdate },
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    themeService = TestBed.inject(ThemeService);
    swUpdate = TestBed.inject(SwUpdate);
    component = fixture.debugElement.componentInstance;
  });

  it('AppComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate onBeforeInstallPrompt', () => {
    component.onBeforeInstallPrompt(mockEvent);
    expect(themeService.promptEvent).toEqual(mockEvent);
  });

  it('Validate existUpdate', () => {
    expect(component.existUpdate()).toBeUndefined();
  });
});
