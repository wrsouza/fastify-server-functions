import z from "zod";

export interface User {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface UserRegisterBody {
    name: string
    email: string
}

export interface UserCreateRequest {
    Body: UserRegisterBody
}

export interface UserShowRequest {
    Params: {
        userId: string
    }
}

export interface UserUpdateRequest extends UserCreateRequest {
    Params: {
        userId: string
    }
}

export interface UserDestroyRequest extends UserShowRequest {}

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const UserListSchema = {
    tags: ['users'],
    description: 'List users',
    response: {
        200: z.array(userSchema).describe('User List')
    }
}

export const UserCreateSchema = {
    tags: ['users'],
    description: 'Create a new user',
    body: z.object({
        name: z.string().default('John Doe'),
        email: z.string().email().default('john.doe@domain.com')
    }),
    response: {
        201: userSchema.describe('User created')
    }
}

export const UserShowSchema = {
    tags: ['users'],
    description: 'Show user',
    params: z.object({
        userId: z.string().uuid()
    }),
    response: {
        200: userSchema.describe('User found')
    }
}

export const UserUpdateSchema = {
    tags: ['users'],
    description: 'Update user',
    params: z.object({
        userId: z.string().uuid()
    }),
    body: z.object({
        name: z.string().default('John Doe'),
        email: z.string().email().default('john.doe@domain.com')
    }),
    response: {
        200: userSchema.describe('User updated')
    }
}

export const UserDestroySchema = {
    tags: ['users'],
    description: 'Delete user',
    params: z.object({
        userId: z.string().uuid()
    }),
    response: {
        204: z.undefined().describe('User Removed')
    }
}