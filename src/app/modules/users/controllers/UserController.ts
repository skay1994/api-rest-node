import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { DeleteUserService } from '../services/DeleteUserService';
import { ShowUserService } from '../services/ShowUserService';
import { UpdateUserService } from '../services/UpdateUserService';
import { CreateUserService } from '../services/CreateUserService';

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userService = new CreateUserService();

    const user = await userService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const showUser = new ShowUserService();

    const user = await showUser.show(id);

    return response.status(200).json(classToClass(user));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.deleteUser(id);

    return response.status(200).json({ Ok: true });
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const user = await updateUser.updateUser({ id, name });

    return response.status(200).json(classToClass(user));
  }
}

export default new UserController();
