import { UserCreateSchema, UserDestroySchema, UserListSchema, UserShowSchema, UserUpdateSchema } from "./user.schema";
import { FastifyTypedInstance } from "../../types";
import { UserModule } from "./user.module";

export async function UsersRoutes(app: FastifyTypedInstance) {
    const { list, create, show, update, destroy } = UserModule();
    
    app.get('/users', UserListSchema, list)
    app.post('/users', UserCreateSchema, create)
    app.get('/users/:userId', UserShowSchema, show)
    app.put('/users/:userId', UserUpdateSchema, update)
    app.delete('/users/:userId', UserDestroySchema, destroy)
}