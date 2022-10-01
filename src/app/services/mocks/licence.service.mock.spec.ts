import { Licence } from '../../common/interfaces';

export class LicenceServiceMock {
  public static readonly listLicence: Licence[] = [
    {
      id: 1,
      codUser: 2,
      description: 'MOCK',
      dateInit: '2022-09-30',
      dateEnd: '2022-09-30',
    },
    {
      id: 2,
      codUser: 3,
      description: 'MOCK',
      dateInit: '2022-09-30',
      dateEnd: '2022-09-30',
    },
  ];

  public static readonly licence: Licence = {
    id: 1,
    codUser: 2,
    description: 'MOCK',
    dateInit: '2022-09-30',
    dateEnd: '2022-09-30',
  };
}
