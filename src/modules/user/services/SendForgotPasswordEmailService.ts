import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmail } from '../models/forgot.model';
import { IUserRepository } from '../models/user-repository.model';
import { IUserTokensRepository } from '../models/user-tokens-repository.model';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', StatusCodes.NOT_FOUND);
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs'
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        templateFile: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
