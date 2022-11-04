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

export interface ReportAttendance {
  description?: string;
  status: string;
  fullName: string;
  date: string;
  entryTime: string;
  exitTime: string;
}

export interface SearchReportAttendance {
  dateRange: string[];
  id: string;
}

export interface ChartsReport {
  date: string;
  later: string;
  onTime: string;
  absent: string;
  licence: string;
}

export interface ListChartReport {
  listDays: string[];
  listLater: number[];
  listOnTime: number[];
  listAbsent: number[];
  listLicence: number[];
  totalLicence: number;
  totalLater: number;
  totalOnTime: number;
  totalAbsent: number;
}

export interface SearchChartReport {
  dateRange: string[] | Date[];
  id?: number;
}

export interface CardsAttendance {
  totalLater: number;
  totalOnTime: number;
  totalAbsent: number;
  totalLicence: number;
}

export interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?:
    | 'short'
    | 'long'
    | 'shortOffset'
    | 'longOffset'
    | 'shortGeneric'
    | 'longGeneric';
  formatMatcher?: 'best fit' | 'basic';
  hour12?: boolean;
  timeZone?: string;
}
