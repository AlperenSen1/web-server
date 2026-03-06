// import Hono class from hono package which is installed from internet.
import { Hono } from "hono"

// i wrote ../ at the beginning of the path becasue that ./
//  means "Look inside my current folder" and  ../ means "go up one level".

import { db } from "../db"
import { users, threads, messages } from "../db/schema"


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

//this is the users section------------------------------------------------------
// "async" just before (c) parameter is for allowing function to
// pause while it waits for the database 
//Whenever you ask the database to do something (like read, write, or delete), you must use
//await to force the JavaScript engine to pause and wait for the physical hard drive to
//finish its job
app.get("/users", async(c)=>{
  const allUsers = await db.select().from(users)
  return c.json(allUsers)
})

app.post("/users", async(c)=>{
  const body = await c.req.json()
  await db.insert(users).values({ userName:body.userName })
  return c.json({message:"User Successfully Created"},201)
})


// this is threads section-------------------------------------------------------------
app.get("/threads", (c)=>{
  return c.text("This is threads page")
})

app.post("/threads", async(c)=>{
  const body = await c.req.json()
  await db.insert(threads).values({threadName:body.threadName})
  return c.json({message:"Thread Successfully Created"},201)
})


//this is messages section-------------------------------------------------------------
app.get("/messages", async(c)=>{
  const allMessages = await db.select().from(messages)
  return c.json(allMessages)
})

app.post("/messages", async(c)=>{
  const body = await c.req.json()
  const currentTime = new Date().toISOString()
  await db.insert(messages).values({
    contentOfMessage: body.contentOfMessage,
    userID: body.userID,
    threadID: body.threadID,
    sendingTime: currentTime
  })
  return c.json({message: "Message Successfully Created"},201)
})



// says to bun : app object is the one you should use to listen for web traffic.
export default app;

//API ucu= API Endpoint
