import { Routes } from '@angular/router';
import { CalendarViewComponent } from './calendar-view.component';

export const CalendarViewRouter: Routes = [
  {
    path: '',
    component: CalendarViewComponent,
    data: { animation: 'calendar-view' },
  },
];
