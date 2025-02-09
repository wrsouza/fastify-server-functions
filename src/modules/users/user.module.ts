import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { IUserController, UserController } from "./user.controller";

export function UserModule(): IUserController {
    const repository = UserRepository();
    const service = UserService(repository);
    const controller = UserController(service);
    return controller
}