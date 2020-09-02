import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUsers = container.resolve(CreateUsersService);
    const user = await createUsers.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UsersControllers;
