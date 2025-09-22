export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface ISignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      phoneNumber?: string;
    };
    session: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export interface ISigninRequest {
  email: string;
  password: string;
}

export interface ISigninResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      phoneNumber?: string;
    };
    session: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  created_at: string;
  updated_at: string;
}
