import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { IUserService } from './user.service';
import { UserCreateBody, UserUpdateBody } from './user.schema';

export interface IUserController {
    list: RouteHandlerMethod
    create: RouteHandlerMethod
    show: RouteHandlerMethod
    update: RouteHandlerMethod
    destroy: RouteHandlerMethod
}

export function UserController(service: IUserService): IUserController {
    async function list(request: FastifyRequest, reply: FastifyReply) {
        const result = await service.list()
        return result;
    }

    async function create(request: FastifyRequest, reply: FastifyReply) {
        const result = await service.create(request.body as UserCreateBody)
        return reply.status(201).send(result)
    }

    async function show(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string }
        const result = await service.show(userId)
        return result;
    }

    async function update(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string }
        const result = await service.update(userId, request.body as UserUpdateBody)
        return result;
    }

    async function destroy(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string }
        await service.destroy(userId)
        return reply.status(204).send(undefined)
    }

    return {
        list,
        create,
        show,
        update,
        destroy
    }
}