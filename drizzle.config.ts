import { defineConfig } from "drizzle-kit"

//by using export we are making this file content visible.
//defineConfig is a function that checks if the info ,which is given to it as parameter, is 
// valid (is syntax correct and etc.) 
// in typescript and javascript curly brackets are used for creating object.
// by using defineConfig({...}) we are creating and passing a object at the same time 
// to defineConfig function



//i am defining the config on here, as the defineConfig function's parameter, so that
//  defineConfig function can check it.

//JSON is JavaScriptObjectNotation notation=gösterim
export default defineConfig({
    schema: "./db/schema.ts",

    //Drizzle will keep its construction logs
    out: "./drizzle",

    //tell drizzle which language translate to our schema, dialect means "lehçe"
    dialect: "sqlite",

    //location of database file that will be created
    //there is nested object, this principle is required for another db's like MySQL and etc.
    dbCredentials: {url: "file:./database.sqlite"},

})