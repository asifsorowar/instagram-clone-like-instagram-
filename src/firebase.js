import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB8izVoJF6SZaphqtglwtQ33BSKLy_2q68",
  authDomain: "instagram-clone-49907.firebaseapp.com",
  databaseURL: "https://instagram-clone-49907.firebaseio.com",
  projectId: "instagram-clone-49907",
  storageBucket: "instagram-clone-49907.appspot.com",
  messagingSenderId: "553049192597",
  appId: "1:553049192597:web:a6c41add406a7d5c76c39c",
  measurementId: "G-W38X2FD32K",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
