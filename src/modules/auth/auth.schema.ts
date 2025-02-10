import z from "zod";

const authSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    access_token: z.string()
})

export const AuthLoginSchema = {
    tags: ['auth'],
    description: 'User Login',
    body: z.object({
        email: z.string().email().default('john.doe@domain.com')
    }),
    response: {
        200: authSchema.describe('User Authentication')
    }
}