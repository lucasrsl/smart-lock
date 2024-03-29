import { DatabaseCondo } from "../../database/database-condo.js"

export default async function condos (fastify, opts) {
  const database = DatabaseCondo()
  
  fastify.get('/condos/:id', async function (request, reply) {
    const id = request.params.id
    let result
    if(id){
      result = await database.getById(id)
    } else {
      const search = request.query.search
      result = await database.list(search)
    }

    return result;
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
}