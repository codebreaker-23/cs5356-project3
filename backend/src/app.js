/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as db from "./database.js";


const app = express();
app.use(cors());

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
  testName = testName +Math.round(Math.random()*100)

  const space = db.createUserTest(testName)

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

  //console.log("in API")
  //console.log("Body: ", req.body)

  try {
  const space = await db.createSpace(req.body.name,req.body.stats,req.body.userName)

  if (!space){
    res.status(404).send({ message: "Space not created correctly" });
  } 
  res.status(200).send({space});

} catch (error) {
  console.error("Error getting image: ", error);
  res.status(500).send({ message: "Server error" });
}

});

app.get("/api/spaces/:userName", async (req, res) => {  /**
* CS-5356-TODO
* Return a list of all the spaces
*
* 200 OK - with an object containing returned space object
* 404 Not Found - ideally should not error
*/

console.log("IN spaces get API")
  try {
  const userName = req.params.userName;
  const spaces = await db.getSpaces(userName)

  console.log("Returned spaces:", spaces)

  if (!spaces){
    res.status(404).send({ message: "No spaces exist" });
  } 
  res.status(200).send({spaces});

} catch (error) {
  console.error("Error getting image: ", error);
  res.status(500).send({ message: "Server error" });
}

});


// app.get("/api/user", async (req, res) => {
//   const { uid } = req.user;

//   try {
//     const userRecord = await admin.auth().getUser(uid);
//     const userData = {
//       uid: userRecord.uid,
//       email: userRecord.email,
//       displayName: userRecord.displayName,
//       photoURL: userRecord.photoURL,
//     };
//     console.log("Successfully passed the User back: ", userData)
//     res.status(200).send(userData);
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).send({ message: "Error fetching user data" });
//   }
// });

app.get("/api/image/:userName/:spaceName", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space Image
   *
   * 200 OK - with an object containing the image for that space
   * 404 Not Found - when there is no class image found
   *
   * Only this user should have access
   */
  try {
  const spaceName = req.params.spaceName

  const userName = req.params.userName;
  const image = await db.getSpaceImage(spaceName,userName)

  if (!image){
    res.status(404).send({ message: "No space with this name" });
  } 
  res.status(200).send({image});

} catch (error) {
  console.error("Error getting image: ", error);
  res.status(500).send({ message: "Server error" });
}

});

app.get("/api/heatmap/:userName/:spaceName", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space Image
   *
   * 200 OK - with an object containing the image for that space
   * 404 Not Found - when there is no class image found
   *
   * Only this user should have access
   */
  try {
  const spaceName = req.params.spaceName

  const userName = req.params.userName;
  const image = await db.heatmapImage(spaceName,userName)

  if (!image){
    res.status(404).send({ message: "No space with this name" });
  } 
  res.status(200).send({image});

} catch (error) {
  console.error("Error getting image: ", error);
  res.status(500).send({ message: "Server error" });
}

});



app.set("/api/spaces/image", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space Image
   *
   * 200 OK - with an object containing the image for that space
   * 404 Not Found - when there is no class image found
   *
   * Only this user should have access
   * 
   * Epects: { name: spaceName
   *           image: spaceImage }
   */
  try {
  const spaceName = req.body.name
  const spaceImage = req.body.image

  //const {user} = req.params

  const user = "testUser"

  const space = await db.setSpaceImage(spaceName,spaceImage,user)

  if (!space){
    res.status(404).send({ message: "No space with this name" });
  } 
  res.status(200).send({space});
} catch (error) {
  console.error("Error setting image: ", error);
  res.status(500).send({ message: "Server error" });
}

});

app.get("/api/opportunities/user/:userName/space/:spaceName", async (req, res) => {
  
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

  //console.log("IN API")

  try {
    const { userName, spaceName } = req.params;
    // const user = req.params.user;
    console.log("Params: ", userName, spaceName)
    const spaceOpps = await db.getSpaceOpportunities(spaceName, userName);

    console.log("spaceOpps: ", spaceOpps);

    if (!spaceOpps) {
      res.status(404).send({ message: "No class with this ID" });
    }
  res.status(200).send({spaceOpps});

  } catch (error) {
    console.error("Error getting opportunities: ", error);
    res.status(500).send({ message: "Server error" });
  }

});

app.post("/api/opportunities/add", async (req, res) => {
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

  //console.log("IN Opportunities Add API")

  try {

  const user = req.body.username;
  const spaceName = req.body.name;
  
  // const spaceName = req.body.name
  //console.log("Space Name: ", spaceName)

  if(!spaceName){
    res.status(401).send({ message: "Error passing in name" });
  }

  // Change to the firestore login &
    // or user req.body andc pass that instead
  const newOpportunity = await db.createSpaceOpp(spaceName,
    {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      priority:req.body.priority
    },user)

  console.log("Space opp: ", newOpportunity)

  if(!newOpportunity){
    res.status(401).send({ message: "Error setting new opportunity" });
  }

  console.log("Space opp: ", newOpportunity)
  
  res.status(201).send(newOpportunity);
  console.log("Space opp: ", newOpportunity)
} catch (error) {
  console.error("Error adding opportunity: ", error);
  res.status(500).send({ message: "Server error" });
}

});

app.get("/api/spaces/analytics", async (req, res) => {
  
  /**
   * CS-5356-TODO
   * Get a Space's associated analytics
   *
   * 200 OK - with an object containing an array of the three analytic values
   * 404 Not Found - when there is no class name associated
   *
   * Only this user should have access
   */

  try {
  const spaceName = req.body.name
  const user = "testUser"
  //console.log("IN API, spaceName: ", spaceName)

  const space = await db.getAnalytics(spaceName,user)

  if (!space){
    res.status(404).send({ message: "No space with this name" });
  } 
  res.status(200).send(space);
  } catch (error) {
    console.error("Error setting analytics: ", error);
    res.status(500).send({ message: "Server error" });
    }

});

app.post("/api/spaces/analytics", async (req, res) => {
  /**
   * CS-5356-TODO
   * Set a Space's associated analytics
   *
   * 200 OK - with an object containing the updated analytics object
   * 404 Not Found - when there is no space name associated
   *
   * Only this user should have access
   * Expects body of type:
   * {
        "heatmap": "heatmap",
        "stats": [1, 2, 3]
     }
   */
  try {
    const {name,heatmap, stats } = req.body;
    const user = "testUser"
    const analytics = await db.setAnalytics(name, heatmap, stats,user);

    if (!analytics) {
      res.status(404).send({ message: "No space found with that name" });
    }

    res.status(200).send(analytics);
  } catch (error) {
    console.error("Error setting analytics: ", error);
    res.status(500).send({ message: "Server error" });
  }
});


  
app.delete("/api/spaces/opportunities", async (req, res) => {
  /**
   * CS-5356-TODO
   * Delete the associated opportunity
   *
   * Using firestore, find the associated opportunity list and delete the item with the associated title
   *
   * Return:
   * 200 OK - if successfully deleted
   * 404 Not Found - when there is no space or opportunity found
   *
   * Users should only see their own opportunities and be able to delete them
   */

  const { spaceName, title , userName} = req.body;  
  // console.log("Params: ", spaceName, title, userName)
  const success = await db.dismissOpportunity(spaceName, title,userName);

  if (success) {
    res.status(200).send({ message: "Opportunity successfully deleted" });
  } else {
    res.status(404).send({ message: "No space or opportunity found" });
  }
});

export default app;