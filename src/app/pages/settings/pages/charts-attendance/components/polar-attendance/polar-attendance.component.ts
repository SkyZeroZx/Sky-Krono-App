import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { labels, polarChartOptions } from '@core/config/charts.config';
import { ListChartReport } from '@core/interfaces';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-polar-attendance',
  templateUrl: './polar-attendance.component.html',
  styleUrls: ['./polar-attendance.component.scss'],
})
export class PolarAttendanceComponent implements OnChanges {
  @Input()
  listChartReport: ListChartReport;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  polarAreaChartType: ChartType = 'polarArea';
  polarCharsPlugin = [DataLabelsPlugin];
  polarChartOptions: ChartConfiguration['options'] = polarChartOptions;
  polarAreaChartData: ChartData<'polarArea'> = {
    labels: labels,
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.loadPolarChart();
  }

  loadPolarChart(): void {
    this.polarAreaChartData.datasets[0].data = [
      this.listChartReport.totalAbsent,
      this.listChartReport.totalOnTime,
      this.listChartReport.totalLater,
      this.listChartReport.totalLicence,
    ];

    this.chart?.update();
  }
}
