import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6wgddbWsFdBywNF6jSiEqCi4f6-lsME8",
  authDomain: "fir-react-final.firebaseapp.com",
  projectId: "fir-react-final",
  storageBucket: "fir-react-final.appspot.com",
  messagingSenderId: "352679020018",
  appId: "1:352679020018:web:7f9052cfbad252f70b176b",
  measurementId: "G-Y9Z776379G",
  databaseURL:'https://fir-react-final-default-rtdb.firebaseio.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);