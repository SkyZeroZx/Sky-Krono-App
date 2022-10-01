import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbModule],
  providers: [DatePipe],
  declarations: [],
})
export class AdminLayoutModule {}
