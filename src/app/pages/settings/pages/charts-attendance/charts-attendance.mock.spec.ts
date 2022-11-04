import { ListChartReport, SearchChartReport } from '@core/interfaces';

export class ChartsAttendanceMock {
  static readonly listChartReport: ListChartReport = {
    listDays: ['2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-05'],
    listLater: [1, 2, 3, 4, 5],
    listOnTime: [1, 2, 3, 4, 5],
    listAbsent: [1, 2, 3, 4, 5],
    listLicence: [1, 2, 3, 4, 5],
    totalLicence: 25,
    totalLater: 25,
    totalOnTime: 25,
    totalAbsent: 25,
  };

  static readonly searchChartReport: SearchChartReport = {
    id: 1,
    dateRange : [new Date().toDateString(), new Date().toDateString()] ,
  };
}
