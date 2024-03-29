import { sql } from "./db.js";

sql`DROP TABLE IF EXISTS clients`.then(() => {
  console.log("Table clients deleted!");
  sql`DROP TABLE IF EXISTS locks`.then(() => {
    console.log("Table locks deleted!");
    sql`DROP TABLE IF EXISTS condos`.then(() => {
      console.log("Table condos deleted!");
      sql`
      CREATE TABLE condos (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL
      );
      `.then(() => {
        console.log("Table condos created!");
        sql`
        CREATE TABLE clients (
          id UUID PRIMARY KEY NOT NULL, 
          name VARCHAR(255) NOT NULL,
          house_number INTEGER NOT NULL,
          condo_id UUID REFERENCES condos(id) NOT NULL
        );
        `.then(() => {
            console.log("Table clients created!");
            sql`
            CREATE TABLE locks (
              id UUID PRIMARY KEY NOT NULL,
              name VARCHAR(255) NOT NULL,
              condo_id UUID REFERENCES condos(id) NOT NULL
            );
            `.then(() => {
              console.log("Table locks created!");
            });
        });
      });
    });
  });
});




