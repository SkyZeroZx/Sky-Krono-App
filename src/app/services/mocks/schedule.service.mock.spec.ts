import { Schedule, ScheduleByUser, UpdateSchedule } from '../../common/interfaces';

export class ScheduleServiceMock {
  public static readonly listSchedule: Schedule[] = [
    {
      id: 1,
      name: 'test',
      notificationIsActive: false,
      description: 'mock',
      entryHour: '12:12',
      exitHour: '16:16',
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      toleranceTime: 15,
    },
    {
      id: 2,
      name: 'mock 2',
      notificationIsActive: false,
      description: 'mock 2',
      entryHour: '02:12',
      exitHour: '09:16',
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false,
      toleranceTime: 5,
    },
  ];

  public static readonly updateSchedule: UpdateSchedule = {
    codSchedule: 1,
    name: 'test',
    notificationIsActive: false,
    description: 'mock',
    entryHour: '12:12',
    exitHour: '16:16',
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
    toleranceTime: 15,
  };

  public static readonly scheduleByUser: ScheduleByUser = {
    dayIsValid: true,
    schedule: ScheduleServiceMock.listSchedule[0],
  };
}
