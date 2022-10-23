export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  id: number;
  username: string;
  role: string;
  token: string;
  message: string;
  firstLogin?: boolean;
}

export interface User {
  id?: number;
  username: string;
  role: string;
  createdAt?: Date;
  updateAt?: Date;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  status?: string;
  firstLogin?: boolean;
  photo?: string;
  phone?: string;
  codChargue?: string;
  codSchedule?: string;
  chargue?: string;
  schedule?: string;
}

export interface UserUpdate {
  codChargue: string;
  codSchedule: string;
  id: number;
  fatherLastName: string;
  motherLastName: string;
  status: string;
  role: Roles;
  name: string;
  username: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type Roles = 'admin' | 'employee';

export interface UserReport {
  id: number;
  username: string;
  chargue: string;
  schedule: string;
  role: Roles;
  createdAt: string;
  updateAt: string;
  nombre: string;
  fatherLastName: string;
  motherLastName: string;
  status: string;
}
