import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../config/error/AppError';
import { UserEntity } from '../../users/models/entities/User';
import { AuthUserDto } from '../models/dto/AuthUserDto';

class AuthService {
    async login(data: AuthUserDto) {
      const repository = getRepository(UserEntity);
      const user = await repository.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new AppError('Invalid e-mail/password');
      }

      const passHash = await bcrypt.compare(data.password, user.password);

      if (!passHash) {
        throw new AppError('Invalid e-mail/password');
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        '4c4687ef87543fefcfa41c633c7e19a4e5a03ae1',
        { expiresIn: '1h' },
      );

      const userAuth = { user, token };
      return userAuth;
    }
}

export { AuthService };
