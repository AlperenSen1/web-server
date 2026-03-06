// import Hono class from hono package which is installed from internet.
import { Hono } from "hono"

// i wrote ../ at the beginning of the path becasue that ./
//  means "Look inside my current folder" and  ../ means "go up one level".

import { db } from "../db"
import { users } from "../db/schema"


// Create a Hono class object named app. 
const app = new Hono(); 

//get function takes two parameters first one is the URL, second one is a function. get(URL,Arrow Function)
//we are defining this function(arrow function) by using (parameter)=>{the body}
//This function contains the instructions for what happens when a user visits that path.
// c is a parameter for arrow function, which is "Context" class object that is created by Hono framework automatically.

//this is the homepage section-------------------------------------------------------

//this is route 
app.get("/",(c)=>{
  return c.text("This is homepage.")
})

//this is the users section, "async" just before (c) parameter is for allowing function to
// pause while it waits for the database ------------------------------------------
app.get("/users", async(c)=>{
  const allUsers = await db.select().from(users)
  return c.json(allUsers)
})


// this is threads section-------------------------------------------------------------
app.get("/threads", (c)=>{
  return c.text("This is threads page")
})


//this is messages section-------------------------------------------------------------
app.get("/messages", (c)=>{
  return c.text("This is messages page")
})




// says to bun : app object is the one you should use to listen for web traffic.
export default app;

//API ucu= API Endpoint
