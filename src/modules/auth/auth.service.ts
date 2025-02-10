import { IUserRepository } from "../users/user.repository";

export interface IAuthService {
    login: () => void
}

export function AuthService(repository: IUserRepository): IAuthService {
    async function login() {}

    return {
        login
    }
}