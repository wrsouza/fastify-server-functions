import { UserCreateSchema, UserDestroySchema, UserListSchema, UserShowSchema, UserUpdateSchema } from "./user.schema";
import { UserModule } from "./user.module";
import { FastifyInstance } from "fastify";

export async function UsersRoutes(app: FastifyInstance) {
    const { list, create, show, update, destroy } = UserModule();
    
    app.get('/', { schema: UserListSchema }, list)
    app.post('/', { schema: UserCreateSchema }, create)
    app.get('/:userId', { schema:UserShowSchema }, show)
    app.put('/:userId', { schema: UserUpdateSchema }, update)
    app.delete('/:userId', { schema: UserDestroySchema }, destroy)
}