import { Constant } from '../../../../common/constants/Constant';
import { Schedule, Response } from '../../../../common/interfaces';

export class ScheduleMock {
  public static readonly mockListSchedule: Schedule[] = [
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

  public static readonly mockScheduleNotificationDisabled: Schedule = {
    name: '',
    description: '',
    notificationIsActive: false,
    entryHour: '',
    exitHour: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    toleranceTime: 0,
  };

  public static readonly mockScheduleNotificationEnabled: Schedule = {
    name: '',
    description: '',
    notificationIsActive: true,
    entryHour: '',
    exitHour: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    toleranceTime: 0,
  };

  public static readonly mockScheduleDelete: Schedule = {
    id: 1,
    name: '',
    description: '',
    entryHour: '',
    exitHour: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    toleranceTime: 0,
  };

  public static readonly mockScheduleUpdate: Schedule = {
    id: 15,
    name: 'TEST UPDATE',
    description: 'MOCK UPDATE',
    entryHour: '15:15',
    exitHour: '16:51',
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
    toleranceTime: 15,
  };

  public static readonly responseOk: Response = {
    message: Constant.MENSAJE_OK,
    info: 'Its fine',
  };
}
