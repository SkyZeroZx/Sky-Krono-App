import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ListChartReport } from '@core/interfaces/attendance';
import { labels, pieChartOptions } from '@core/config/charts.config';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-attendance',
  templateUrl: './pie-attendance.component.html',
  styleUrls: ['./pie-attendance.component.scss'],
})
export class PieAttendanceComponent implements OnChanges {
  @Input()
  listChartReport: ListChartReport;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [DatalabelsPlugin];
  pieChartOptions: ChartConfiguration['options'] = pieChartOptions;
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: labels,
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.loadPieChart();
  }

  loadPieChart() {
    this.pieChartData.datasets[0].data = [
      this.listChartReport.totalAbsent,
      this.listChartReport.totalOnTime,
      this.listChartReport.totalLater,
      this.listChartReport.totalLicence,
    ];
    this.chart?.update();
  }
}
