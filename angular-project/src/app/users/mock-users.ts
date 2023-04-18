import { User } from './user';

export const USERS: User[] = [
  {
    firstName: 'David',
    lastName: 'Gauch',
    userName: 'GauchD',
    emailAddress: 'david.gauch@unifr.ch',
    password: '123456',
    usedDevices: ['tablet', 'phone'],
  },
  {
    firstName: 'Mattias',
    lastName: 'Duerrmeier',
    userName: 'DuerrmeierM',
    emailAddress: 'mattias.duerrmeier@unifr.ch',
    password: 'secretpassword',
    usedDevices: ['tablet', 'phone'],
  },
];
