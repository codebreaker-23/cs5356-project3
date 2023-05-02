
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// CS5356 TO-DO #0 Add your Firebase Config
const config = {
  apiKey: "AIzaSyB8tmIew8Er4CMtkFO0y5Mk8uX4sSnHOMQ",
  authDomain: "milestone3-a3b64.firebaseapp.com",
  projectId: "milestone3-a3b64",
  storageBucket: "milestone3-a3b64.appspot.com",
  messagingSenderId: "348626529212",
  appId: "1:348626529212:web:fbde8392d60013be4319b9"
};

// CS5356 TO-DO #0 Uncomment these 2 lines after
//   adding your Firebase Config
 firebase.initializeApp(config);
 const firestoreDb = firebase.firestore();

// CS5356 TO-DO #0
export const createUserTest = async (spaceName) => {
  await firestoreDb.collection("testUsers").add(
    {name: spaceName}
  );
  return {name: spaceName}
};

// CS5356 TO-DO #1
export const getSpaceImage = async (spaceName,spaceStats) => {
  // Get the image of a given space name
};

// CS5356 TO-DO #2
export const createSpace = async (spaceName, spaceStats) => {
  try {
    console.log("in DB")
    const spaceRef = firestoreDb.collection("spaces").doc(spaceName);
    const newSpace = {
      name: spaceName,
      //usernname: firebase.auth().currentUser.uid
      img: null,
      opportunities: [],
      analytics: {
        heatmap: null,
        stats: spaceStats
      }
    };
    console.log("New Space: ", newSpace)
    await spaceRef.set(newSpace);
    return { id: spaceName, ...newSpace };
  } catch (error) {
    console.error("Error creating space: ", error);
    throw error;
  }
};

// CS5356 TO-DO #2.5
export const getSpaces = async () => {


  console.log("IN DB")
  //const querySnapshot = await firestoreDb.collection("spaces").where("username","==",firebase.auth().currentUser.uid).get()
  const querySnapshot = await firestoreDb.collection("spaces").get();
  console.log("querySnapshot: ",querySnapshot)
  let results = []
  querySnapshot.forEach((doc)=> {
    results.push(
      {
          id: doc.id,
          ...doc.data()
        });
      });
  console.log("Results: ",results)
  return results
  // Create a new space with the given Name
};

// CS5356 TO-DO #3
export const getSpaceOpportunities = async (spaceName) => {
  const spaces = await getSpaces()
  console.log("In DB, Space: ", spaces)
  for (let i =0; i < spaces.length; i++){
      if (spaces[i].name == spaceName){
        console.log(spaces[i])
        return spaces[i].opportunities
      }
  }

  // Get the opportunities of a given space name
};

// CS5356 TO-DO #4
export const createSpaceOpp = async (spaceName, opportunity) => {
  console.log("IN DB")
  try {
    const spaceRef = firestoreDb.collection("spaces").doc(spaceName);
    const spaceDoc = await spaceRef.get();
    //console.log("spaceDoc: ", spaceDoc)
    if (!spaceDoc.exists) {
      throw new Error("No space found with that name");
    }
    const spaceData = spaceDoc.data();
    //console.log("Space Data: ", spaceData)
    const newOpportunity = {
      category: opportunity.category,
      title: opportunity.title,
      opportunity: opportunity.opportunity,
      description: opportunity.description,
      priority: opportunity.priority
    };
    const updatedOpportunities = [...spaceData.opportunities, newOpportunity];
    //console.log("Updated opps: ", updatedOpportunities)
    await spaceRef.update({ opportunities: updatedOpportunities });
    return newOpportunity;
  } catch (error) {
    console.error("Error adding opportunity: ", error);
    throw error;
  }
};


// CS5356 TO-DO #5
export const getAnalytics = async (spaceName) => {
  try {
    const spaceRef = firestoreDb.collection("spaces").doc(spaceName);
    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      throw new Error("No space found with that name");
    }
    const spaceData = spaceDoc.data();
    return spaceData.analytics;
  } catch (error) {
    console.error("Error getting analytics: ", error);
    throw error;
  }
};

// CS5356 TO-DO #6
export const dismissOpportunity = async (spaceName,title) => {
  try {
    const spaceRef = firestoreDb.collection("spaces").doc(spaceName);
    await spaceRef.delete();
  } catch (error) {
    console.error("Error dismissing opportunity: ", error);
    throw error;
  }

};
