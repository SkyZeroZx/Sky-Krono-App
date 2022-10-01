import { User, Response } from '../../common/interfaces';
import { Constant } from '../../common/constants/Constant';
import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';

export class UserProfileMock {
  public static readonly userProfileMock: User = {
    username: 'example@mail.to',
    role: 'admin',
    name: 'userExample',
    fatherLastName: 'fatherLastNameExample',
    motherLastName: 'motherLastNameExample',
  };

  public static readonly responseOk: Response = {
    message: Constant.MENSAJE_OK,
    info: 'Its fine',
  };

  public static readonly responseError: Response = {
    message: 'ERROR',
    info: 'Something',
  };

  public static readonly tokenMock: any = {
    endpoint: '',
    expirationTime: 343443,
    options: null,
  };

  public static readonly publicKeyCredentialCreationOptionsJSON: PublicKeyCredentialCreationOptionsJSON =
    {
      user: undefined,
      challenge: '',
      excludeCredentials: [],
      pubKeyCredParams: [],
      rp: undefined,
    };

  public static readonly registrationCredentialJSON: RegistrationCredentialJSON = {
    rawId: '',
    response: undefined,
    clientExtensionResults: undefined,
    id: '',
    type: '',
  };

  public static readonly mockServiceWorker = {
    requestSubscription: jasmine.createSpy('requestSubscription'),
  };
}
