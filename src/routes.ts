import { FastifyTypedInstance } from "./types";
import { UsersRoutes } from './modules/users/user.routes';

export async function routes(app: FastifyTypedInstance) {
    app.register(UsersRoutes)
}