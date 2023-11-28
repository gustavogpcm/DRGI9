import { FastifyInstance, fastify } from 'fastify'

import cors from '@fastify/cors'

import { healthCheck } from '../modules/healthCheck/healthCheckRoutes'
import { createXmlRoutes } from '../modules/createXml/createXml.routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
const app: FastifyInstance = fastify()

const apiPort = Number(process.env.PORT)
// app
app.register(cors, {
  origin: true,
})

app.register(fastifySwagger)
app.register(fastifySwaggerUi, {})
app.register(healthCheck)
app.register(createXmlRoutes)

app
  .listen({
    port: apiPort,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${apiPort}`)
  })
