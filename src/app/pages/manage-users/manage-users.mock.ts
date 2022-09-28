import { User, Schedule, Chargue } from '../../common/interfaces';

export class ManageUsersMock {
  public static readonly userMock: User = {
    id: 1,
    username: 'skyzero',
    role: 'admin',
    createdAt: new Date(),
    updateAt: new Date(),
    name: 'sky',
    fatherLastName: 'zero',
    motherLastName: 'zx',
    status: 'HABILITADO',
    firstLogin: false,
    photo: null,
    phone: null,
    codChargue: '1',
    codSchedule: '2',
    chargue: 'ADMIN',
    schedule: 'SCHEDULE MOCK',
  };

  public static readonly listUsersMock: User[] = [
    {
      id: 1,
      username: 'skyzero',
      role: 'admin',
      createdAt: new Date(),
      updateAt: new Date(),
      name: 'sky',
      fatherLastName: 'zero',
      motherLastName: 'zx',
      status: 'HABILITADO',
      firstLogin: false,
      photo: null,
      phone: null,
      codChargue: '1',
      codSchedule: '2',
      chargue: 'ADMIN',
      schedule: 'SCHEDULE MOCK',
    },
    {
      id: 2,
      username: 'skyzero 2',
      role: 'admin 2',
      createdAt: new Date(),
      updateAt: new Date(),
      name: 'sky 2',
      fatherLastName: 'zero 2',
      motherLastName: 'zx 2',
      status: 'HABILITADO',
      firstLogin: false,
      photo: null,
      phone: null,
      codChargue: '1',
      codSchedule: '2',
      chargue: 'ADMIN',
      schedule: 'SCHEDULE MOCK',
    },
  ];

  public static readonly listChargues: Chargue[] = [
    { id: 1, name: 'Chargue Test 1', description: 'Description Test 1' },
    { id: 2, name: 'Chargue Test 2', description: 'Description Test 2' },
  ];

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
}
