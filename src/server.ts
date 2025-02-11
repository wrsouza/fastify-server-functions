import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { routes } from './routes'
import { exceptionHandler } from './common/exceptions'
import { fastifyHelmet } from '@fastify/helmet'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifyHelmet)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Typed Api',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(routes)

app.setErrorHandler(exceptionHandler)

const startApp = async () => {
    try {
        await app.listen({ port: 3000, host: `0.0.0.0` })
        app.log.info(`server is running!`)
    } catch (err) {
        app.log.error(err)
        process.exit(1);
    }
}

startApp()