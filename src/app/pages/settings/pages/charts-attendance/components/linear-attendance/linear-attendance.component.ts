import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { labels, lineChartOptions } from '@core/config/charts.config';
import { ListChartReport } from '../../../../../../common/interfaces';

@Component({
  selector: 'app-linear-attendance',
  templateUrl: './linear-attendance.component.html',
  styleUrls: ['./linear-attendance.component.scss'],
})
export class LinearAttendanceComponent implements OnChanges {
  @Input()
  listChartReport: ListChartReport;
  lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  lineChartOptions: ChartConfiguration['options'] = lineChartOptions;

  ngOnChanges(): void {
    this.loadLinearChart();
  }

  loadLinearChart() {
    this.lineChartData.labels = this.listChartReport.listDays;
    this.lineChartData.datasets = [
      {
        data: this.listChartReport.listAbsent,
        label: labels[0],
        fill: 'origin',
      },
      {
        data: this.listChartReport.listOnTime,
        label: labels[1],
        fill: 'origin',
      },
      {
        data: this.listChartReport.listLater,
        label: labels[2],
        fill: 'origin',
      },
      {
        data: this.listChartReport.listLicence,
        label: labels[3],
        fill: 'origin',
      },
    ];
    this.chart?.update();
  }
}
