import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { Constant } from '../../common/constants/Constant';
import { UserLoginResponse } from '../../common/interfaces';

export class LoginMock {
  public static readonly userFirstLogin: UserLoginResponse = {
    id: 1,
    username: 'SkyZeroZx',
    role: 'admin',
    token: null,
    message: Constant.MENSAJE_OK,
    firstLogin: true,
  };

  public static readonly userNotFirstLogin: UserLoginResponse = {
    id: 1,
    username: 'SkyZeroZx',
    role: 'admin',
    token: null,
    message: Constant.MENSAJE_OK,
    firstLogin: false,
  };

  public static readonly authenticationCredentialJSON: AuthenticationCredentialJSON = {
    rawId: '1',
    response: null,
    clientExtensionResults: null,
    id: '15',
    type: 'direct',
  };

  public static readonly publicKeyCredentialRequestOptionsJSON: PublicKeyCredentialRequestOptionsJSON =
    {
      challenge: '',
    };

  public static readonly verifyAuthenticationOK: any = {
    verified: true,
    data: LoginMock.userNotFirstLogin,
  };

  public static readonly verifyAuthenticationError: any = {
    verified: false,
  };
}
