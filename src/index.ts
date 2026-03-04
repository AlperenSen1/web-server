// import Hono class from hono package which is installed from internet.
import { Hono } from "hono"

// Create a Hono class object named app. 
const app = new Hono(); 

//get function takes two parameters first one is the URL, second one is a function. get(URL,Arrow Function)
//we are defining this function(arrow function) by using (parameter)=>{the body}
//This function contains the instructions for what happens when a user visits that path.
// c is a parameter for arrow function, which is "Context" class object that is created by Hono framework automatically.

app.get("/",(c)=>{
  return c.text("This is homepage")
})
