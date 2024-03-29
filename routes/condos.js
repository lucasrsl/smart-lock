import { DatabaseCondo } from "../database/database-condo.js"

export default async function condos (fastify, opts) {
  const database = new DatabaseCondo()
  
  fastify.get('/condos', async function (request, reply) {
    const search = request.query.search
    return await database.list(search)
  })

  fastify.get('/condos/:id', async function (request, reply) {
    const id = request.params.id
    return await database.getById(id)
  })

  fastify.post('/condos', async function(request, reply) {
    const { name, address } = request.body
    let result = await database.create({
      name,
      address
    })
    return reply.status(201).send({ id: result});
  })

  fastify.put('/condos/:id', async function(request, reply) {
    const id = request.params.id
    const { name, address } = request.body
    await database.update(id, {
      name,
      address
    })
    return reply.status(204).send();
  })

  fastify.delete('/condos/:id', async (request, reply) => {
    const id = request.params.id;
    await database.delete(id);
    return reply.status(204).send();
})
}