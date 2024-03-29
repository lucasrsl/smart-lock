import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabaseCondo {
    async getById(id){
        return sql`select * from condos where id = ${id}`
    }

    async list(search){
        let condos

        if(search) {
            condos = await sql`select * from condos where name like ${'%' + search + '%'}`
        } else {
            condos = await sql`select * from condos`
        }

        return condos
    }

    async create(condo){
        const id = randomUUID()
        const { name, address } = condo

        await sql`insert into condos (id, name, address) values (${id}, ${name}, ${address})`
        return id
    }

    async update(id, condo){
        const { name, address } = condo

        await sql`update condos set name = ${name}, address = ${address} where id = ${id}`
    }

    async delete(id){
        await sql`delete from condos where id = ${id}`
    }

}