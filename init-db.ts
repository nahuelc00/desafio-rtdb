import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://rtdb-cap4-default-rtdb.firebaseio.com",
});

const rtdb = admin.database();

export { rtdb };
