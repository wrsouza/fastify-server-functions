import { UserCreateSchema, UserDestroySchema, UserListSchema, UserShowSchema, UserUpdateSchema } from "./user.schema";
import { UserModule } from "./user.module";
import { FastifyInstance } from "fastify";

export async function UsersRoutes(app: FastifyInstance) {
    const { list, create, show, update, destroy } = UserModule();
    
    app.get('/users', { schema: UserListSchema }, list)
    app.post('/users', { schema: UserCreateSchema }, create)
    app.get('/users/:userId', { schema:UserShowSchema }, show)
    app.put('/users/:userId', { schema: UserUpdateSchema }, update)
    app.delete('/users/:userId', { schema: UserDestroySchema }, destroy)
}