import { getRepository } from 'typeorm';
import { AppError } from '../../../../config/error/AppError';
import { UserDto } from '../models/dto/UserDto';
import { UserEntity } from '../models/entities/User';

class ShowUserService {
    private repository = getRepository(UserEntity);

    async show(id: string): Promise<UserDto> {
      const userExists = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new AppError('User does not exists.');
      }

      return userExists;
    }
}

export { ShowUserService };
