export interface IRequestSuccess {
  message?: string;
}

export interface IAuthSuccess extends IRequestSuccess {
  accessToken: string;
  data: {
    email: string;
    id: string;
  };
}

export interface IAuthPayload {
  email: string;
}
