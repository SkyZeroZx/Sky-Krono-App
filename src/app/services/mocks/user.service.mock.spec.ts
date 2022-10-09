import { User, UserUpdate } from '../../common/interfaces';

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

  public static readonly filePhotoUser: any = {};
}
