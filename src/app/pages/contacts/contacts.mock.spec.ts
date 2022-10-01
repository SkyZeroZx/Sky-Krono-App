import { User } from '../../common/interfaces';

export class ContactsMock {
  public static readonly contactSelected: User = {
    id: 4,
    username: 'skyzerobot64A@gmail.com',
    role: 'admin',
    createdAt: '2022-09-29T00:00:00.000Z' as any,
    updateAt: '2022-09-29T00:00:00.000Z' as any,
    name: 'ATesting',
    fatherLastName: 'fatherLastName',
    motherLastName: 'motherLastName',
    status: 'CREADO',
    photo: null,
    phone: '961008127',
    codChargue: '1',
    chargue: 'admin',
    codSchedule: '2',
    schedule: 'Schedule Test',
  };

  public static readonly mockEvent: any = {
    preventDefault() {
      return;
    },
    stopPropagation() {
      return;
    },
  };
}
