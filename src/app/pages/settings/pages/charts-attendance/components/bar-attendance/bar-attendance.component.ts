import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ListChartReport } from '@core/interfaces';
import { barChartOptions, labels } from '@core/config/charts.config';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-attendance',
  templateUrl: './bar-attendance.component.html',
  styleUrls: ['./bar-attendance.component.scss'],
})
export class BarAttendanceComponent implements OnChanges {
  @Input()
  listChartReport: ListChartReport;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  barChartPlugins = [DataLabelsPlugin];
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = barChartOptions;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnChanges(): void {
    this.loadBarChart();
  }

  loadBarChart() {
    this.barChartData.labels = this.listChartReport.listDays;
    this.barChartData.datasets = [
      {
        data: this.listChartReport.listAbsent,
        label: labels[0],
        borderWidth: 0.8,
      },
      {
        data: this.listChartReport.listOnTime,
        label: labels[1],
        borderWidth: 0.8,
      },
      {
        data: this.listChartReport.listLater,
        label: labels[2],
        borderWidth: 0.8,
      },
      {
        data: this.listChartReport.listLicence,
        label: labels[3],
        borderWidth: 0.8,
      },
    ];
    this.chart?.update();
  }
}
