import { ReportAttendance } from '../../../../common/interfaces';

export class ReportAttendanceMock {
  public static readonly listReportAttendance: ReportAttendance[] = [
    {
      description: 'Mock Description',
      date: '2022-10-25',
      fullName: 'SkyZeroZx',
      status: 'PUNTUAL',
      entryTime: '12:12',
      exitTime: '19:19',
    },
    {
      description: 'Mock Description',
      date: '2022-10-26',
      fullName: 'SkyZeroZx',
      status: 'TARDE',
      entryTime: '12:12',
      exitTime: '19:19',
    },
  ];
}
