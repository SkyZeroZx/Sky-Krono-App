import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorInterceptorService } from './services/interceptor/error-interceptor.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MyHammerConfig } from './common/config/HammerJsConfig';

registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      toastClass: 'alert',
      positionClass: 'toast-top-right',
    }),
    NgxSpinnerModule,
    ServiceWorkerModule.register('custom-service-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:5000',
    }),
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: ToastrService, useClass: ToastrService },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
