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

  console.log("in app")

  let testName = "testUser"
  console.log(testName)
  testName = testName +Math.round(Math.random()*100)
  console.log(testName)

  const space = db.createUserTest(testName)

  console.log("Returned space:",space)

  if (!space){
    res.status(404).send({ message: "Space not created correctly" });
  } 
  res.status(200).send({space});

});

app.post("/api/spaces/", (req, res) => {
  
  /**
   * CS-5356-TODO
   * Create a Space Image
   *
   * 200 OK - with an object containing returned space object
   * 404 Not Found - ideally should not error
   *
   * Only this user should have access
   */


  const space = db.createSpace(req.body.name)

  if (!space){
    res.status(404).send({ message: "Space not created correctly" });
  } 
  res.status(200).send({space});

});

app.get("/api/spaces/:name/image", (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space Image
   *
   * 200 OK - with an object containing the image for that space
   * 404 Not Found - when there is no class image found
   *
   * Only this user should have access
   */

  const {name} = req.params

  const space = db.getSpaceImage(name)

  if (!space){
    res.status(404).send({ message: "No class with this ID" });
  } 
  res.status(200).send({space});

});

app.get("/api/spaces/:name/opportunities", (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space's associated opportunnities 
   *
   * 200 OK - with an object containing an array of opportunnities JSON objects?
   * 404 Not Found - when there is no class name associated
   *
   * Only this user should have access
   */

  const {name} = req.params

  const space = db.getSpaceImage(name)

  if (!space){
    res.status(404).send({ message: "No class with this ID" });
  } 
  res.status(200).send({space});

});

app.post("api/spaces/:name/opportunities/add", (req, res) => {
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
   */
  
  const spaceName = req.body.name

  // Change to the firestore login
  if(spaceName && req.session.username){
    // or user req.body and pass that instead
    const newOpportunity = db.createSpaceOpp(spaceName,{category: req.body.category, title: req.body.title,opportunity: req.body.opportunity, description: req.body.description,priority:req.body.priority})
    res.status(201).send(newOpportunity);
  }
  else{
    // Channge to check for firestore
    if(!req.session.username){
      res.status(401).send({ message: "Unathorized user" });
    }
    if(!spaceName){
      res.status(400).send({ message: "Request Body Missing" });
    }
    else{
      res.status(401).send({ message: "Other error" });
    }
  }
  

  res.status(501).send({ message: "Not implemented yet" });
  

});

app.get("/api/spaces/:name/analytics", (req, res) => {
  
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

  const space = db.getSpaceImage(name)

  if (!space){
    res.status(404).send({ message: "No class with this ID" });
  } 
  res.status(200).send({space});

});

  
app.post("/api/spaces/:name/opportunities/remove/:oppName", (req, res) => {
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
  if(!req.session.username){
    res.status(401).send({ message: "Unathorized user" });
  }

  let userClasses = db.getClasses(req.session.username)

  if(!userClasses){
    userClasses = []
  }
  res.status(200).send({classes: userClasses});
});

app.get("/", (request, response) => {
  res.send("Hello world");
});

export default app;