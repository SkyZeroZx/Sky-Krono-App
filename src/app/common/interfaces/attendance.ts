export interface Attendance {
  isActive: boolean;
  isLater: boolean;
  isAbsent: boolean;
  description?: string;
  date: string;
  entryTime?: string;
  exitTime?: string;
}

export interface AttendanceHistoryUser {
  currentDate: string;
  listHistoryStatusAttendance: StatusAttendance[];
}

export interface StatusAttendance {
  isActive: boolean;
  isLater: boolean;
  isDayOff: boolean;
  isAbsent: boolean;
  date: string;
}
