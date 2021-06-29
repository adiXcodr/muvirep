import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import { firebaseConfig } from "./constants";

firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();
firebase.storage();


export default firebase;