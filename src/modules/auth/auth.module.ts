import { UserRepository } from "../users/user.repository";
import { AuthController, IAUthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export function AuthModule(): IAUthController {
    const repository = UserRepository()
    const service = AuthService(repository)
    const controller = AuthController(service)
    return controller
}