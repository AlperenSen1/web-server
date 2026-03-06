// this is Database Manager file which is a bridge between backend and database.
//when backend wants to read or write data from database, it doesn't directly acces the 
// databse, instead; this bridge handles it. there is a translator between backend language
// which is typescript and databse language which is sql.

//Database class is used for opening the .sqlite file
import { Database } from "bun:sqlite"

// drizzle function translates typescript to sql
import { drizzle } from "drizzle-orm/bun-sqlite"

//this line exists to find and open the database.sqlite file
const sqlite = new Database("database.sqlite")

// this line enables me to communicate with databse.sqlite file by using typescript language
export const db = drizzle(sqlite)
