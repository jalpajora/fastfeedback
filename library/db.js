// import * as admin from 'firebase-admin';
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection
} from 'firebase/firestore/lite';
import firebase from '@/library/firebase';

const db = getFirestore(firebase.getApp());

export async function createUser(uid, data) {
  const usersRef = doc(db, 'users', uid);
  const user = await setDoc(usersRef, {
    uid,
    ...data,
    merge: true
  });

  return user;
}

export async function createSite(data) {
  const siteCollection = collection(db, 'sites');
  return await addDoc(siteCollection, data);
}

export async function createFeedback(data) {
  console.log(data);
  const feedbackeCollection = collection(db, 'feedback');
  return await addDoc(feedbackeCollection, data);
}
