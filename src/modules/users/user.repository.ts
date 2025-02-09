import { User } from "./user.schema";

export interface IUserRepository {
    list: () => Promise<User[]>
    find: (key: keyof User, value: any) => Promise<User | undefined>
    create: (data: User) => Promise<void>
    save: (id: string, data: User) => Promise<void>
    destroy: (id: string) => Promise<void>
}

export function UserRepository(): IUserRepository {
    const users: User[] = [];

    async function list(): Promise<User[]> {
        return users;
    }

    async function find(key: keyof User, value: any): Promise<User | undefined> {
        return users.find(user => user[key] === value);
    }

    async function create(data: User): Promise<void> {
        users.push(data);
    }

    async function save(id: string, data: User): Promise<void> {
        const index = users.findIndex(user => user.id === id)
        users[index] = data
    }

    async function destroy(id: string): Promise<void> {
        const index = users.findIndex(user => user.id === id)
        users.splice(index, 1);
    }

    return {
        list,
        create,
        find,
        save,
        destroy
    }
}

