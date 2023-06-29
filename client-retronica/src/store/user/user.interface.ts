import { IUser } from '../../types/user.interface';

export interface IUserState {
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean;
  };
}
