import { Component, Input } from '@angular/core';
import { CardsAttendance, ListChartReport } from '@core/interfaces';

@Component({
  selector: 'app-cards-attendance',
  templateUrl: './cards-attendance.component.html',
  styleUrls: ['./cards-attendance.component.scss'],
})
export class CardsAttendanceComponent {
  @Input()
  listChartReport: ListChartReport;
  cardsAttendance: CardsAttendance = {
    totalLater: 0,
    totalOnTime: 0,
    totalAbsent: 0,
    totalLicence: 0,
  };

  ngOnChanges(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardsAttendance = {
      totalAbsent: this.listChartReport.totalAbsent,
      totalOnTime: this.listChartReport.totalOnTime,
      totalLater: this.listChartReport.totalLater,
      totalLicence: this.listChartReport.totalLicence,
    };
  }
}
