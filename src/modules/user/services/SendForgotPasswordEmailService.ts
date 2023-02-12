import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from './../repositories/UserRepository';
import { UserTokenRepository } from './../repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', StatusCodes.NOT_FOUND);
    }

    const token = await UserTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
