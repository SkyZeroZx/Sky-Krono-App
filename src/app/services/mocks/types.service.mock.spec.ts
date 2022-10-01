import { Type } from '../../common/interfaces';

export class TypesServiceMock {
  public static readonly type: Type = {
    codType: 1,
    description: 'Mock Description',
    backgroundColor: '#FFFF',
    borderColor: '#B2004',
    start: '2022-09-30',
    end: '2022-09-30',
    display: 'BLOCK',
  };

  public static readonly listTypes: Type[] = [
    {
      codType: 1,
      description: 'Mock Description',
      backgroundColor: '#FFFF',
      borderColor: '#B2004',
      start: '2022-09-30',
      end: '2022-09-30',
      display: 'BLOCK',
    },
    {
      codType: 2,
      description: 'Mock 2 Description',
      backgroundColor: '#FFFF',
      borderColor: '#B2004',
      start: '2022-10-01',
      end: '2022-10-01',
      display: 'BLOCK',
    },
  ];
}
