import { AttendanceHistoryUser, Attendance } from '../../common/interfaces';

export class AttendanceServiceMock {
  public static readonly mockAttendance: Attendance = {
    isActive: false,
    isLater: false,
    isAbsent: false,
    date: '',
  };
  public static readonly mockAttendanceHistoryUser: AttendanceHistoryUser = {
    currentDate: '',
    listHistoryStatusAttendance: [],
  };

  public static readonly attendanceDescription: string = 'Is Optional';
}
