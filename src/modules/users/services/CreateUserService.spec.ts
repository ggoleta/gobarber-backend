import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUsersService(fakeUserRepository, fakeHashProvider);
  });
  it('should be albe to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Rogério',
      email: 'rogerio@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    // expect(user.password).toBe('123456');
  });

  it('should not be albe to create a new user with email that already exists', async () => {
    await createUser.execute({
      name: 'Rogério',
      email: 'rogerio@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Rogério',
        email: 'rogerio@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
