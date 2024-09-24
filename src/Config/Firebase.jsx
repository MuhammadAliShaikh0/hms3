// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCJZoYUGsse-4bkmaz2IrZVYGcpUdfnHME",
//   authDomain: "localstorage-195f6.firebaseapp.com",
//   databaseURL: "https://localstorage-195f6-default-rtdb.firebaseio.com",
//   projectId: "localstorage-195f6",
//   storageBucket: "localstorage-195f6.appspot.com",
//   messagingSenderId: "766253277685",
//   appId: "1:766253277685:web:90d31e911c28b220b4c0bc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export {auth,db,storage}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMnlqeLymGUKl70eXphoCo0nRSBZXBe4Q",
  authDomain: "calculator-3be51.firebaseapp.com",
  projectId: "calculator-3be51",
  storageBucket: "calculator-3be51.appspot.com",
  messagingSenderId: "749289470575",
  appId: "1:749289470575:web:ccef52b0c15ff0357b2b9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}