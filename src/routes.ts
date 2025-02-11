import { AuthRoutes } from './modules/auth/auth.routes';
import { UsersRoutes } from './modules/users/user.routes';
import { FastifyInstance, onRequestHookHandler } from "fastify";

export async function routes(app: FastifyInstance) {
    /*
    app.addHook('onRequest', (request, reply, done) => {
        const { authorization } = request.headers
        if (!authorization) {
            return reply.status(401).send('Unauthorized')
        }
        done()
    })
    */
    app.register(UsersRoutes, { prefix: 'api/users' })
}