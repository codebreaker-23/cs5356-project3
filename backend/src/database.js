
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
export const getSpaceImage = async (spaceName) => {
  // Get the image of a given space name
};

// CS5356 TO-DO #2
export const createSpace = async (spaceName) => {
  // Create a new space with the given Name
};

// CS5356 TO-DO #3
export const getSpaceOpportunities = async (spaceName) => {
  // Get the opportunities of a given space name
};

// CS5356 TO-DO #4
export const createSpaceOpp = async (spaceName,body) => {
  // Get the opportunities of a given space name
};

// CS5356 TO-DO #5
export const getAnalytics = async (spaceName) => {
  // Get all the three major stats and return them
  return [];
};

// CS5356 TO-DO #6
export const dismissOpportunity = async (spaceName,title) => {
  try {
    await firestoreDb.collection("opportunities").doc(spaceName).delete()
  }
  catch(err){
    console.log(err)
  }

};
