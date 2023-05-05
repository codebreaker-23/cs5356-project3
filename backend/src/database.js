
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth'
import { getStorage, ref, getDownloadURL  } from "firebase/storage";
import { query, where } from "firebase/firestore"; 

// CS5356 TO-DO #0 Add your Firebase Config
const config = {
  apiKey: "AIzaSyB8tmIew8Er4CMtkFO0y5Mk8uX4sSnHOMQ",
  authDomain: "milestone3-a3b64.firebaseapp.com",
  projectId: "milestone3-a3b64",
  storageBucket: "milestone3-a3b64.appspot.com",
  messagingSenderId: "348626529212",
  appId: "1:348626529212:web:fbde8392d60013be4319b9",
  storageBucket: 'milestone3-a3b64.appspot.com'
};

// CS5356 TO-DO #0 
 firebase.initializeApp(config);
 const firestoreDb = firebase.firestore();

 const spacesRef = firestoreDb.collection('spaces');


// CS5356 TO-DO #0
export const createUserTest = async (spaceName) => {
  await firestoreDb.collection("testUsers").add(
    {name: spaceName}
  );
  return {name: spaceName}
};

export const getImageFileName = async (spaceName,spaceUser) => {
  try {
    console.log("getting file name for: ", spaceName)
    const spaceDoc = await getSpace(spaceName,spaceUser)
    return spaceDoc.img
  } catch (error) {
    console.error("Error getting analytics: ", error);
    throw error;
  }
};

// CS5356 TO-DO #1
export const getSpaceImage = async (spaceName,spaceUser) => {
  // Get the image of a given space name
  let storage = getStorage()


  const fileName = await getImageFileName(spaceName,spaceUser)

  console.log("file name: ", fileName)

  const imagesRef = ref(storage, 'images');
  const spaceRef = ref(imagesRef, fileName);

  console.log("spaceRef: ", spaceRef)

  // Get the download URL of the image
  const url = await getDownloadURL(spaceRef);

  console.log("URL: ", url)

  return url;
};

// CS5356 TO-DO #1.5
export const setSpaceImage = async (spaceName,spaceImageName,spaceImageFile,spaceUser) => {
  // Get the image of a given space name
  const storage = getStorage();

  
  const mountainImagesRef = ref(storage, 'images/mountains.jpg');

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
};

// CS5356 TO-DO #2
export const createSpace = async (spaceName, spaceStats,spaceUser) => {

  try {
    console.log("in DB", firestoreDb.collection("spaces").doc(spaceName))
    const spaceRef = firestoreDb.collection("spaces").doc(spaceName);
    const newSpace = {
      name: spaceName,
      username: spaceUser,
      img: "",
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
export const getSpaces = async (spaceUser) => {


  console.log("IN DB")
  const querySnapshot = await spacesRef.where("username","==",spaceUser).get();
  //const querySnapshot = await firestoreDb.collection("spaces").get();
  console.log("querySnapshot: ",querySnapshot)
  let results = []
  querySnapshot.forEach((doc)=> {
    results.push(
      {
          id: doc.id,
          ...doc.data()
        });
      });
  //console.log("Results: ",results)
  return results
  // Create a new space with the given Name
};

export const getSpace = async (spaceName,spaceUser) => {
  console.log("Space User: ", spaceUser)
  console.log("Space User: ", spaceName)
  const space = await spacesRef.where('username', '==', spaceUser).where('name', '==', spaceName).get();
  console.log("Space: ", space)
  let results = []
  space.forEach((doc)=> {
    results.push(
      {
          id: doc.id,
          ...doc.data()
        });
      });
  return results[0]
  //console.log("Results: ",results)

    

  // Get the opportunities of a given space name
};

// CS5356 TO-DO #3
export const getSpaceOpportunities = async (spaceName,spaceUser) => {
  const spaces = await getSpace(spaceName,spaceUser)
  console.log("Space: ", spaces)
  
  return spaces.opportunities

  // Get the opportunities of a given space name
};

// CS5356 TO-DO #4
export const createSpaceOpp = async (spaceName, opportunity,spaceUser) => {
  //console.log("IN DB")
  try {
    let spaceQuery = spacesRef.where('username', '==', spaceUser).where('name', '==', spaceName);
    const querySnapshot = await spaceQuery.get();

    if (querySnapshot.empty) {
      throw new Error("No space found with that name");
    }

    let spaceDoc;
    querySnapshot.forEach(doc => {
      spaceDoc = doc;
    });
    if (!spaceDoc.exists) {
      throw new Error("No space found with that name");
    }
    const spaceData = spaceDoc.data();
    console.log("spaceData: ", spaceData)
    const newOpportunity = {
      category: opportunity.category,
      title: opportunity.title,
      description: opportunity.description,
      priority: opportunity.priority
    };
    const updatedOpportunities = [...spaceData.opportunities, newOpportunity];
    console.log("Updated opps: ", updatedOpportunities)
    await spaceDoc.ref.update({ opportunities: updatedOpportunities });
    return newOpportunity;
  } catch (error) {
    console.error("Error adding opportunity: ", error);
    throw error;
  }
};

export const setAnalytics = async (spaceName, heatmap, stats,spaceUser) => {
  try {
    let spaceQuery = spacesRef.where('username', '==', spaceUser).where('name', '==', spaceName);
    const querySnapshot = await spaceQuery.get();

    if (querySnapshot.empty) {
      throw new Error("No space found with that name");
    }

    let spaceDoc;
    querySnapshot.forEach(doc => {
      spaceDoc = doc;
    });
    if (!spaceDoc.exists) {
      throw new Error("No space found with that name");
    }

    const updatedAnalytics = {
      heatmap: heatmap,
      stats: stats,
    };

    await spaceDoc.ref.update({ analytics: updatedAnalytics });

    return updatedAnalytics;
  } catch (error) {
    console.error("Error setting analytics: ", error);
    throw error;
  }
};


// CS5356 TO-DO #5
export const getAnalytics = async (spaceName,spaceUser) => {
  try {
    const spaceRef = await getSpace(spaceName,spaceUser)
    return spaceRef.analytics;
  } catch (error) {
    console.error("Error getting analytics: ", error);
    throw error;
  }
};

// CS5356 TO-DO #6
export const dismissOpportunity = async (spaceName,oppTitle,spaceUser) => {
  try {
    let spaceQuery = spacesRef.where('username', '==', spaceUser).where('name', '==', spaceName);
    const querySnapshot = await spaceQuery.get();

    if (querySnapshot.empty) {
      throw new Error("No space found with that name");
    }

    let spaceDoc;
    querySnapshot.forEach(doc => {
      spaceDoc = doc;
    });
    if (!spaceDoc.exists) {
      throw new Error("No space found with that name");
    }
    const spaceData = spaceDoc.data();
    //console.log("Space data: ", spaceData)
    //console.log("Space data opportunities: ", spaceData.opportunities)

    let updatedOpportunities = []

    updatedOpportunities = spaceData.opportunities.filter((opp) => opp.title !== oppTitle);

    //console.log("Updated Opportunities: ", updatedOpportunities)

    await spaceDoc.ref.update({ opportunities: updatedOpportunities });
    return true;
  } catch (error) {
    console.error("Error deleting opportunity: ", error);
    throw error;
  }
};





