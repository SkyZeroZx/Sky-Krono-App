import { Chargue } from '../../../../common/interfaces';

export class ChargueMock {
  public static readonly listChargue: Chargue[] = [
    { id: 1, name: 'Chargue 1', description: 'Mock1' },
    { id: 2, name: 'Chargue 2', description: 'Mock2' },
  ];

  public static readonly chargue: Chargue = {
    id: 1,
    name: 'Chargue 1',
    description: 'Mock1',
  };
}
