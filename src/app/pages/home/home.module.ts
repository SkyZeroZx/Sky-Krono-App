import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRouter } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(HomeRouter)],
})
export class HomeModule {}
