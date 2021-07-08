import { getRepository } from 'typeorm';
import { AppError } from '../../../../config/error/AppError';
import { UpdateUserDto } from '../models/dto/UpdateUserDto';
import { UserEntity } from '../models/entities/User';

class UpdateUserService {
    private repository = getRepository(UserEntity);

    public async updateUser(data: UpdateUserDto): Promise<UserEntity> {
      const userExists = await this.repository.findOne({
        where: {
          id: data.id,
        },
      });

      if (!userExists) {
        throw new AppError('User does not exists.');
      }

      const users = {
        ...data,
      };

      const result = await this.repository.save(users);
      return result;
    }
}

export { UpdateUserService };
