import { Response } from '../../common/interfaces/response';
export class ResponseMock {
  public static readonly genericResponse: Response = {
    message: 'OK',
    info: 'Its fine',
  };
}
