import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProvidersServices';

let fakeUserRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be albe to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
