import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUserId = this.users.find(user => user.id === id);

    return findUserId;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserEmail = this.users.find(user => user.email === email);

    return findUserEmail;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(findUser => findUser === user);
    this.users[findUserIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
