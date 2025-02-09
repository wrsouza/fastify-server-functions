import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from "fastify-type-provider-zod"
import { NotFoundError, ValidationError } from "./errors"
import { FastifyReply, FastifyRequest } from "fastify"

export async function exceptionHandler(err: any, req: FastifyRequest, reply: FastifyReply) {
    if (hasZodFastifySchemaValidationErrors(err)) {
        return reply.code(400).send({
            error: 'Response Validation Error',
            message: "Request doesn't match the schema",
            statusCode: 400,
            details: {
                issues: err.validation,
                method: req.method,
                url: req.url,
            },
        })
    }
    
    if (err instanceof NotFoundError) {
        return reply.code(404).send({
            error: 'Not Found',
            message: err.message,
            statusCode: 404,
            details: {
                method: req.method,
                url: req.url,
            },
        })
    }

    if (err instanceof ValidationError) {
        return reply.code(400).send({
            error: 'Response Validation Error',
            message: err.message,
            statusCode: 400,
            details: {
                method: req.method,
                url: req.url,
            },
        })
    }

    if (isResponseSerializationError(err)) {
        return reply.code(500).send({
            error: 'Internal Server Error',
            message: "Response doesn't match the schema",
            statusCode: 500,
            details: {
                issues: err.cause.issues,
                method: err.method,
                url: err.url,
            },
        })
    }
}