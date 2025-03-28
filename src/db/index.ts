//import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Pool } from 'pg';
import * as schema from "@db/schema";
import 'dotenv/config';

// Prueba
import postgres from 'postgres';


if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// // Configuración del pool de conexiones
// const client = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const client = postgres(process.env.DATABASE_URL);

// Inicialización de drizzle con el pool
export const db = drizzle(client, { schema });

// Definición de la tabla
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

// const users = pgTable("toggle_users", {
//   id: serial("id"),
//   username: text("username"),
//   created_at: timestamp("created_at")
// });

// // Consulta de usuarios
// db.select().from(users)
//   .then(users => {
//     console.log('Usuarios:', users);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   })
//   .finally(async () => {
//     // Importante: cerrar el pool cuando la aplicación termina
//     await pool.end();
//   });

//Listado de usuarios
//import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
const users = pgTable("toggle_users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull()
});
db.select().from(users)
.then(tables => {
  console.log('Tablas en la base de datos:', tables);
})
.catch(error => {
  console.error('Error al obtener las tablas:', error);
});