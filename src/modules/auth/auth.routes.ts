import { FastifyInstance } from "fastify";
import { AuthModule } from "./auth.module";
import { AuthLoginSchema } from "./auth.schema";

export async function AuthRoutes(app: FastifyInstance) {
    const { login } = AuthModule()
    app.post('/auth', { schema: AuthLoginSchema }, login)
}