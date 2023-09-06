import { initializeApp } from "firebase/app";

import { addDoc, getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot, where, query, setDoc } from 'firebase/firestore'

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCsHb12szV0sMyZzLYnkTQ4I-HxbP3GEBs",
  authDomain: "facebook-14efe.firebaseapp.com",
  projectId: "facebook-14efe",
  storageBucket: "facebook-14efe.appspot.com",
  messagingSenderId: "103815859768",
  appId: "1:103815859768:web:948660b73760a6beca20cd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

// ref for collection 
const userRef = collection(db, 'user');


const auth = getAuth(app)


export {
  db,
  userRef,
  addDoc,
  app,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  where,
  query,
  collection,
  setDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
}

