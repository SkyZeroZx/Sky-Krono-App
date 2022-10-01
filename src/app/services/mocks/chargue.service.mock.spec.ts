import { Chargue, UpdateChargue } from '../../common/interfaces';

export class ChargueServiceMock {
  public static readonly listChargue: Chargue[] = [
    { id: 1, name: 'MOCK NAME 1', description: 'MOCK 1' },
    { id: 2, name: 'MOCK NAME 2', description: 'MOCK 2' },
  ];

  public static readonly updateChargue: UpdateChargue = {
    codChargue: 0,
    name: 'Update Chargue Mock',
    description: 'Update Chargue Description',
  };
}
