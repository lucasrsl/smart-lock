import { sql } from "./db.js";

sql`DROP TABLE IF EXISTS clients`.then(() => {
  console.log("Table clients deleted!");
  sql`DROP TABLE IF EXISTS locks`.then(() => {
    console.log("Table locks deleted!");
    sql`DROP TABLE IF EXISTS condominiums`.then(() => {
      console.log("Table condominiums deleted!");
      sql`
      CREATE TABLE condominiums (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL
      );
      `.then(() => {
        console.log("Table condominiums created!");
        sql`
        CREATE TABLE clients (
          id UUID PRIMARY KEY NOT NULL, 
          name VARCHAR(255) NOT NULL,
          house_number INTEGER NOT NULL,
          condominium_id UUID REFERENCES condominiums(id) NOT NULL
        );
        `.then(() => {
            console.log("Table clients created!");
            sql`
            CREATE TABLE locks (
              id UUID PRIMARY KEY NOT NULL,
              name VARCHAR(255) NOT NULL,
              condominium_id UUID REFERENCES condominiums(id) NOT NULL
            );
            `.then(() => {
              console.log("Table locks created!");
            });
        });
      });
    });
  });
});




