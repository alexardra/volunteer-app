import { axios } from '@/lib/axios';
import { AxiosResponse } from 'axios';

export enum PersonaRoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}
export type PersonaRole = PersonaRoleTypes.ADMIN | PersonaRoleTypes.USER;

export type PersonaCredentials = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: PersonaRole;
  userRole?: UserRole.Beneficiary | UserRole.Volunteer | UserRole.Both;
};

export type PersonaLoginRequest = {
  email: string;
  password: string;
};

export type PersonaAuthResponse = {
  persona: PersonaCredentials;
  token: string;
};

export enum UserRole {
  Beneficiary = 1,
  Volunteer = 2,
  Both = 3,
}

export type UserRegisterRequest = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  referenceLinks: string[];
  personalNumber: string;
  role: UserRole;
  phoneNumber?: string;
  description?: string;
};

export const fetchPersona = (): Promise<PersonaCredentials> => {
  return axios
    .get('/auth/me')
    .then((response: AxiosResponse) => response.data as PersonaCredentials);
};

export const loginUser = (
  credentials: PersonaLoginRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/user/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};

export const loginAdmin = (
  credentials: PersonaLoginRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/admin/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};

export const registerUser = (
  data: UserRegisterRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/user/register', data)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};
