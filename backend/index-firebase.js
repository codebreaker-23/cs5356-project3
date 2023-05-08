import functions from "firebase-functions";
import expressApp from "./src/app.js";

export const api = functions.https.onRequest(expressApp);