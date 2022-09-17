export interface Schedule {
  id?: number;
  name: string;
  notificationIsActive?: boolean;
  description: string;
  entryHour: string;
  exitHour: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  toleranceTime: number;
}

export interface UpdateSchedule {
  codSchedule?: number;
  name?: string;
  notificationIsActive?: boolean;
  description?: string;
  entryHour?: string;
  exitHour?: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  toleranceTime?: number;
}

export interface ScheduleByUser {
  dayIsValid: boolean;
  schedule: Schedule;
}
