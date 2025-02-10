import { IAuthService } from './auth.service'

export interface IAUthController {
    login: () => void
}

export function AuthController(service: IAuthService): IAUthController {
    async function login() {

    }

    return {
        login
    }
}