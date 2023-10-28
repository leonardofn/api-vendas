import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UserService from './UserService';

let fakeUserRepository: FakeUserRepository;
let userService: UserService;
let fakeHashProvider: FakeHashProvider;

describe('UserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    userService = new UserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await userService.create({
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a two users with the same email', async () => {
    const newUser = {
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com',
      password: '123456',
    };

    await userService.create(newUser);

    expect(
      userService.create({
        name: 'Leonardo Dev',
        email: 'leonardodev@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
