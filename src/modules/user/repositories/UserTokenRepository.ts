import { AppDataSource } from '@config/db.config';
import UserToken from '../entities/UserToken';

export const UserTokenRepository = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    return this.createQueryBuilder('user_token')
      .where('user_token.token = :token', { token })
      .getOne();
  },

  async generate(user_id: string): Promise<UserToken | null> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
