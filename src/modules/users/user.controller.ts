import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { IUserService } from './user.service';
import { UserCreateRequest, UserDestroyRequest, UserShowRequest, UserUpdateRequest } from './user.schema';

export interface IUserController {
    list: (request: FastifyRequest, reply: FastifyReply) => void
    create: (request: FastifyRequest<UserCreateRequest>, reply: FastifyReply) => void
    show: (request: FastifyRequest<UserShowRequest>, reply: FastifyReply) => void
    update: (request: FastifyRequest<UserUpdateRequest>, reply: FastifyReply) => void
    destroy: (request: FastifyRequest<UserDestroyRequest>, reply: FastifyReply) => void
}

export function UserController(service: IUserService): IUserController {
    async function list(request: FastifyRequest, reply: FastifyReply) {
        const result = await service.list()
        return reply.status(200).send(result)
    }

    async function create(request: FastifyRequest<UserCreateRequest>, reply: FastifyReply) {
        const result = await service.create(request.body)
        return reply.status(201).send(result)
    }

    async function show(request: FastifyRequest<UserShowRequest>, reply: FastifyReply) {
        const { userId } = request.params
        const result = await service.show(userId)
        return reply.status(200).send(result)
    }

    async function update(request: FastifyRequest<UserUpdateRequest>, reply: FastifyReply) {
        const { userId } = request.params as { userId: string }
        const result = await service.update(userId, request.body)
        return reply.status(200).send(result)
    }

    async function destroy(request: FastifyRequest<UserDestroyRequest>, reply: FastifyReply) {
        const { userId } = request.params
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