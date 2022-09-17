import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { SettingsRouter } from './settings.routing';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, RouterModule.forChild(SettingsRouter)],
})
export class SettingsModule {}
