import { Auth } from './config/auth';
import { Mapping } from './config/mapping';
import { Server } from './config/server';
import { Account } from './config/account';

export const pageConfig = {
  ...Auth,
  ...Mapping,
  ...Server,
  ...Account
};