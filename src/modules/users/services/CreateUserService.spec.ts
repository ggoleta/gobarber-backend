import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be albe to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Rogério',
      email: 'rogerio@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    // expect(user.password).toBe('123456');
  });

  it('should not be albe to create a new user with email that already exists', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Rogério',
      email: 'rogerio@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Rogério',
        email: 'rogerio@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(user.password).toBe('123456');
  });
});
