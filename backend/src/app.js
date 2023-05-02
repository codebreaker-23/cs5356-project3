/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import bodyParser from "body-parser";
import * as db from "./database.js";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.post("/api/userTest", (req, res) => {
  
  /**
   * CS-5356-TODO
   * Create a Space Image
   *
   * 200 OK - with an object containing returned space object
   * 404 Not Found - ideally should not error
   *
   * Only this user should have access
   */

  //console.log("in app")

  let testName = "testUser"
  //console.log(testName)
  testName = testName +Math.round(Math.random()*100)
  console.log(testName)

  const space = db.createUserTest(testName)

  //console.log("Returned space:",space)

  if (!space){
    res.status(404).send({ message: "Space not created correctly" });
  } 
  res.status(200).send({testName});

});

app.post("/api/spaces/", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Create a Space 
   *
   * 200 OK - with an object containing returned space object
   * 404 Not Found - ideally should not error
   *
   * Only this user should have access
   * Expects {name: spaceName, stats:[1,2,3]}
   */

  console.log("in API")
  console.log("Body: ", req.body)

  const space = await db.createSpace(req.body.name,req.body.stats)

  if (!space){
    res.status(404).send({ message: "Space not created correctly" });
  } 
  res.status(200).send({space});

});

app.get("/api/spaces/", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Return a list of all the spaces
   *
   * 200 OK - with an object containing returned space object
   * 404 Not Found - ideally should not error
   */

  
  console.log("IN API")

  const spaces = await db.getSpaces()

  console.log("Returned spaces:", spaces)

  if (!spaces){
    res.status(404).send({ message: "No spaces exist" });
  } 
  res.status(200).send({spaces});

});

app.get("/api/spaces/image", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space Image
   *
   * 200 OK - with an object containing the image for that space
   * 404 Not Found - when there is no class image found
   *
   * Only this user should have access
   */

  const spaceName = req.body.name

  const space = await db.getSpaceImage(spaceName)

  if (!space){
    res.status(404).send({ message: "No space with this name" });
  } 
  res.status(200).send({space});

});

app.get("/api/opportunities", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space's associated opportunnities 
   *
   * 200 OK - with an object containing an array of opportunnities JSON objects?
   * 404 Not Found - when there is no class name associated
   *
   * Only this user should have access
   * Expects name in the api call
   * Returns an array of JSON objects of type
     opportunities":{
        "category": "Soldering",
        "title": "Soldering",
        "opportunity": "hello hello hello",
        "description": "xxxx...,
        "priority": "1",
    }
}
   */

  console.log("IN API")
  
  const spaceName = req.body.name

  console.log("Space Name: ", spaceName)


  const spaceOpps = await db.getSpaceOpportunities(spaceName)

  if (!spaceOpps){
    res.status(404).send({ message: "No class with this ID" });
  } 
  res.status(200).send({spaceOpps});

});

app.post("api/opportunities/add", async (req, res) => {
  /**
   * CS-5356-TODO
   * Create a new opportunity for a givenn space 
   *
   * Using `db`, create a new opportunity and add it 
   *
   * Return:
   * 201 Created - with the opportunity object
   * 404 Not Found - when there is no space associated
   *
   * Only this user should have access
   * Expects body of type
   * {
        "category": "Soldering",
        "title": "Soldering",
        "opportunity": "hello hello hello",
        "description": "xxxx...,
        "priority": "1",
    }
   */

  console.log("IN API")
  
  const spaceName = req.body.name

  console.log("Space Name: ", spaceName)

  // Change to the firestore login &
  if(spaceName){
    // or user req.body andc pass that instead
    const newOpportunity = await db.createSpaceOpp(spaceName,
      {
        category: req.body.category,
        title: req.body.title,
        opportunity: req.body.opportunity, 
        description: req.body.description,
        priority:req.body.priority
      })
    
  }

  console.log("Space opp: ", newOpportunity)
  
  if(!newOpportunity){
      res.status(401).send({ message: "Error" });
  }
  res.status(201).send(newOpportunity);

});

app.get("/api/spaces/:name/analytics", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space's associated analytics
   *
   * 200 OK - with an object containing an array of the three analytic values
   * 404 Not Found - when there is no class name associated
   *
   * Only this user should have access
   */

  const {name} = req.params

  const space = await db.getAnalytics(name)

  if (!space){
    res.status(404).send({ message: "No class with this ID" });
  } 
  res.status(200).send({space});

});

  
app.post("/api/spaces/:name/opportunities/remove/:oppName", async (req, res) => {
  /**
   * CS-5356-TODO
   * Dismiss the the associated opportunity
   *
   * Using firestore, find the associated opportunity list and delte the item with the associated title
   *
   * Return:
   * 200 OK - if successfuly deleted
   * 401 Unauthorized - when there is no space or opportunity found
   *
   * Users should only see their own opportunities and  be able to dismiss them 
   */

  let dismissedOpp = await db.dismissOpportunity(req.params.oppName)
   if (!dismissedOpp){
    console.log("ERROR")
   }
  res.status(200).send(dismissedOpp);
});

app.get("/", (request, response) => {
  res.send("Hello world");
});

export default app;