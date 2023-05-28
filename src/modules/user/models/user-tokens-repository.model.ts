import { IUserToken } from './user-token.model';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  generate(user_id: string): Promise<IUserToken>;
}
