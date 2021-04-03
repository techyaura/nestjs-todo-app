export interface IRequestSuccess {
  message: string;
}

export interface IAuthSuccess extends IRequestSuccess {
  accessToken: string;
}

export interface IAuthPayload {
  email: string;
}
