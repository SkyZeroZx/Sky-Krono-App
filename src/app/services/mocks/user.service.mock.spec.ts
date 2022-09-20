import { UserUpdate } from '../../common/interfaces/user';

export class UserServiceMock {
  public static readonly userUpdate: UserUpdate = {
    codChargue: '',
    codSchedule: '',
    id: 0,
    fatherLastName: '',
    motherLastName: '',
    status: '',
    role: 'admin',
    name: '',
    username: '',
  };
}
