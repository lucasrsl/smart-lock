export default async function clients (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
}
