// import * as admin from 'firebase-admin';
import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';
import firebase from 'library/firebase';

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
