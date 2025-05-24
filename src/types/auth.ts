export interface SignupData {
  name: string;
  email: string;
  password: string;
  insideWorker: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
