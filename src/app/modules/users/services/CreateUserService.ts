import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { AppError } from '../../../../config/error/AppError';
import { CreateUserDto } from '../models/dto/CreateUserDto';
import { UserEntity, UserStatus } from '../models/entities/User';

class CreateUserService {
    private repository = getRepository(UserEntity);

    async execute(data: CreateUserDto) {
      const existsEmail = await this.repository.findOne({
        where: {
          email: data.email,
        },
      });

      if (existsEmail) {
        throw new AppError('E-mail already exists.');
      }

      const passHash = await hash(data.password, 8);
      const user = this.repository.create({
        ...data,
        password: passHash,
        status: UserStatus.active,
      });

      await this.repository.save(user);
      return user;
    }
}

export { CreateUserService };
