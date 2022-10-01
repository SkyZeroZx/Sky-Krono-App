import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';
import { ChangePassword, UserLogin, UserLoginResponse } from '../../common/interfaces';

export class AuthServiceMock {
  public static readonly userLogin: UserLogin = {
    username: 'example@mail.to',
    password: 'Admin1',
  };

  public static readonly userLoginResponse: UserLoginResponse = {
    id: 0,
    username: 'example@mail.to',
    role: 'Admin',
    token: null,
    message: 'OK',
  };

  public static readonly userDataWebAuthn: any = {
    data: {},
  };

  public static readonly changePassword: ChangePassword = {
    oldPassword: 'Admin12345',
    newPassword: 'Admin12345',
  };

  public static readonly publicKeyCredentialCreationOptionsJSON: PublicKeyCredentialCreationOptionsJSON =
    {
      user: null,
      challenge: '',
      excludeCredentials: [],
      pubKeyCredParams: [],
      rp: null,
    };
  public static readonly registrationCredentialJSON: RegistrationCredentialJSON = {
    rawId: '',
    response: null,
    clientExtensionResults: null,
    id: '',
    type: '',
  };
}
