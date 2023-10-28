import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UserAuthService from './UserAuthService';

let fakeUserRepository: FakeUserRepository;
let userAuthService: UserAuthService;
let fakeHashProvider: FakeHashProvider;

describe('UserAuthService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    userAuthService = new UserAuthService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com',
      password: '123456',
    });

    const response = await userAuthService.execute({
      email: 'leonardodev@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with not existent user', async () => {
    expect(
      userAuthService.execute({
        email: 'leonardodev@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    expect(
      userAuthService.execute({
        email: 'leonardodev@test.com',
        password: '567890',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
