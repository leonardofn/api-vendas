import { IUser } from './user.model';

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}
