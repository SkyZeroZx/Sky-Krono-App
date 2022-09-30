import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { UserProfileRouter } from './user-profile.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserPhotoComponent } from './components/user-photo/user-photo.component';

@NgModule({
  declarations: [UserProfileComponent, UserOptionsComponent, UserPhotoComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    NgbModule,
    ModalModule.forRoot(),
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(UserProfileRouter),
  ],
  providers: [DatePipe],
})
export class UserProfileModule {}
