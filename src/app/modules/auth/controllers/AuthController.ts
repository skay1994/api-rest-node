import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

class AuthController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const authService = new AuthService();

    const userLogin = await authService.login({
      email,
      password,
    });

    return response.json(classToClass(userLogin));
  }
}

export default new AuthController();
