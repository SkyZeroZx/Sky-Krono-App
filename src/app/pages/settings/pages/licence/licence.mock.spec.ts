import { Licence } from '../../../../common/interfaces';

export class LicenceMock {
  public static readonly listLicenceMock: Licence[] = [
    {
      id: 25,
      codUser: 1,
      description: 'Mock Description',
      dateInit: new Date().toString(),
      dateEnd: new Date().toString(),
      fullName: 'Mock User Full Name',
    },
  ];

  public static readonly mockinputLicence: any = {
    id: 0,
    codUser: 0,
    description: 'Testing',
    dateInit: new Date(),
    dateEnd: new Date(),
  };
}
