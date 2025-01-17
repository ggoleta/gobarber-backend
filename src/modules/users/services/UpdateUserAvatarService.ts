import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // valid id?
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // user already has avatar image?
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    // update avatar
    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
