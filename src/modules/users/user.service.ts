import { randomUUID } from 'node:crypto';
import { IUserRepository, UserRepository } from './user.repository'
import { User, UserCreateBody, UserUpdateBody } from './user.schema';
import { NotFoundError, ValidationError } from '../../common/errors';

export interface IUserService {
    list: () => Promise<User[]>,
    create: (body: UserCreateBody) => Promise<User>
    show: (id: string) => Promise<User>
    update: (id: string, body: UserUpdateBody) => Promise<User>
    destroy: (id: string) => Promise<void>
}

export function UserService(repository: IUserRepository): IUserService {

    async function list() {
        return repository.list()
    }

    async function create({ name, email }: UserCreateBody) {
        const user = await repository.find('email', email)
        if (user) {
            throw new ValidationError('E-mail already exist');
        }
        const datetime = new Date()
        const newUser = {
            id: randomUUID(),
            name,
            email,
            createdAt: datetime,
            updatedAt: datetime
        }
        await repository.create(newUser);
        return newUser;
    }

    async function show(id: string) {
        const user = await repository.find('id', id)
        if (!user) {
            throw new NotFoundError('User not exists');
        }
        return user
    }

    async function update(id: string, { name, email }: UserUpdateBody) {
        const user = await repository.find('id', id)
        if (!user) {
            throw new NotFoundError('User not exists');
        }

        const userEmail = await repository.find('email', email)
        if (userEmail && userEmail.id !== id) {
            throw new ValidationError('E-mail already exist')
        }

        user.name = name
        user.email = email
        user.updatedAt = new Date()
        await repository.save(id, user)
        return user
    }

    async function destroy(id: string) {
        const user = await repository.find('id', id)
        if (!user) {
            throw new NotFoundError('User not exists');
        }
        await repository.destroy(id)
    }

    return {
        list,
        create,
        show,
        update,
        destroy
    }
}