import { getRepository } from 'typeorm';
import { AppError } from '../../../../config/error/AppError';
import { UserEntity } from '../models/entities/User';

class DeleteUserService {
    private repository = getRepository(UserEntity);

    public async deleteUser(id: string) {
      const userExists = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new AppError('User does not exists.');
      }

      await this.repository.delete({ id: userExists.id });
    }
}

export { DeleteUserService };
