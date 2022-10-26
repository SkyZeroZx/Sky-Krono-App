import { ReportAttendance } from '../../../../common/interfaces';

export class ReportAttendanceMock {
  public static readonly listReportAttendance: ReportAttendance[] = [
    {
      description: 'Mock Description',
      date: '2022-10-25',
      fullName: 'SkyZeroZx',
      status: 'PUNTUAL',
    },
    {
      description: 'Mock Description',
      date: '2022-10-26',
      fullName: 'SkyZeroZx',
      status: 'TARDE',
    },
  ];
}
