import { readFileSync } from 'fs'
import { join } from 'desm'
import fp from 'fastify-plugin'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import 'dotenv/config'

const { version } = JSON.parse(readFileSync(join(import.meta.url, '../package.json')))

async function swaggerGenerator (fastify, opts) {
  // Swagger documentation generator for Fastify.
  // It uses the schemas you declare in your routes to generate a swagger compliant doc.
  // https://github.com/fastify/fastify-swagger
  await fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'Ricardo condos smart lock',
        description: 'Condos smart lock documentation',
        version
      },
      host: 'localhost:3000', // and your deployed url
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Bearer',
          in: 'header'
        },
        Csrf: {
          type: 'apiKey',
          name: 'x-csrf-token',
          in: 'header'
        }
      }
    },
    // let's expose the documentation only in development
    // it's up to you decide who should see this page,
    // but it's always better to start safe.
    exposeRoute: process.env.NODE_ENV !== 'production'
  })

  if (process.env.NODE_ENV !== 'production') {
    await fastify.register(SwaggerUI, {
      routePrefix: '/documentation'
    })
  }
}

export default fp(swaggerGenerator, {
  name: 'swaggerGenerator'
})
