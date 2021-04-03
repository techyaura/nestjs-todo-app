export interface IRequestSuccess {
  message?: string;
}

export interface IAuthResponse {
  id: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthSuccess extends IRequestSuccess {
  accessToken: string;
  data: IAuthResponse;
}

export interface IAuthPayload {
  email: string;
}
